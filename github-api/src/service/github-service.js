export default class GithubService {
	_baseUrl = 'https://api.github.com'
	_sortRepos = '&sort=stars&order=desc'
	_populationRepos = `${this._baseUrl}/search/repositories?q=stars%3A%3E0${this._sortRepos}&page=1&per_page=10`
	_nameRepos = `${this._baseUrl}/search/repositories?q=`
	_detailsRepos = `${this._baseUrl}/repos/`
	_detailsUser = `${this._baseUrl}/users`
	_acceptSearch = 'application/vnd.github.mercy-preview+json'
	_acceptRepos = 'application/vnd.github.nebula-preview+json'
	_acceptLangOrContr = 'application/vnd.github.mercy-preview+json'
	_languages = '/languages'
	_contributors = '/contributors'
	_perPage = 10

	getRepositories = async (search, currentPage) => {
		if (search === '') {
			const result = await this.requestRepositories(this._populationRepos)
			return this._transfromDataRepos(result.items, 1)
		} else {
			const result = await this.requestRepositories(
				`${this._nameRepos}${search}+in:name${this._sortRepos}&page=${currentPage}&per_page=${this._perPage}`
			)
			return this._transfromDataRepos(result.items, result.totalPage)
		}
	}

	requestRepositories = async (url) => {
		const response = await fetch(url, this._getHeader(this._acceptSearch))
		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, received ${response.status}`)
		}
		const link = response.headers.get('link')
		const totalPage = this._searchTotalCount(link)
		const body = await response.json()
		return {
			items: body.items,
			totalPage,
		}
	}

	requestRepository = async (url) => {
		const response = await fetch(
			`${this._detailsRepos}${url}`,
			this._getHeader(this._acceptRepos)
		)
		if (response.status !== 200) {
			if (response.status === 404) {
				return response.statusText
			} else {
				throw new Error(`Could not fetch ${url}, received ${response.status}`)
			}
		}
		const repos = this._transformRepository(await response.json())
		const languages = await this.getRequestLanguages(url)
		const contributors = await this.getRequestContributors(url)
		const userData = await this.getDataUser(url)
		return this._transformDataCart(userData, repos, languages, contributors)
	}

	getDataUser = async (url) => {
		const loginUrl = url.split('/')[0]
		const response = await fetch(`${this._detailsUser}/${loginUrl}`)
		const body = await response.json()
		return this._transformDataUser(body)
	}

	getRequestContributors = async (url) => {
		const response = await fetch(
			`${this._detailsRepos}${url}${this._contributors}`,
			this._getHeader(this._acceptLangOrContr)
		)
		const body = await response.json()
		return this._transformContributors(body)
	}

	getRequestLanguages = async (url) => {
		const response = await fetch(
			`${this._detailsRepos}${url}${this._languages}`,
			this._getHeader(this._acceptLangOrContr)
		)
		const body = await response.json()
		return this._transformLanguages(body)
	}

	_transformRepository = (repos) => {
		const { name, description, stargazers_count, updated_at, html_url } = repos
		const itemRepos = {
			name,
			desc:
				description === null ? 'Описание репозитория отсутствует' : description,
			stars: stargazers_count,
			dateCommit: this._transformDate(updated_at),
			linkRepos: html_url,
		}
		return itemRepos
	}

	_transformDataCart = (user, repos, lang, contr) => {
		return {
			user,
			repos,
			lang,
			contr,
		}
	}

	_transformDataUser = ({ name, avatar_url, html_url }) => {
		return {
			name: name === null ? 'Псевдоним отсутствует' : name,
			avatarUrl: avatar_url,
			linkUser: html_url,
		}
	}

	_transformContributors = (contr) => {
		let shadowCopy = [...contr]
		if (shadowCopy.length > 10) {
			shadowCopy = shadowCopy.slice(0, 10)
		}
		return shadowCopy.map(({ login }) => login)
	}

	_transformLanguages = (lang) => {
		if (Object.keys(lang).length === 0) {
			return ['Список отсутствует']
		}
		return Object.keys(lang)
	}

	_getHeader = (accept) => {
		return {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				Accept: accept,
			},
		}
	}

	_searchTotalCount = (link) => {
		if (link === null) {
			return 1
		}
		const links = link.split(',')
		const relLast = links.filter(
			(link) => link.replace(/"/g, "'").indexOf("rel='last'") !== -1
		)
		if (relLast.length !== 0) {
			const indexLastPage = relLast[0].indexOf('page=')
			const indexAmp = relLast[0].indexOf('&', indexLastPage)
			const total = +relLast[0].slice(indexLastPage + 5, indexAmp)
			return total
		}
		const relPrev = links.filter(
			(link) => link.replace(/"/g, "'").indexOf("rel='prev'") !== -1
		)
		const indexPrevPage = relPrev[0].indexOf('page=')
		const indexAmp = relPrev[0].indexOf('&', indexPrevPage)
		const total = +relPrev[0].slice(indexPrevPage + 5, indexAmp) + 1
		return total
	}

	_transformDate = (date) => {
		const indexTime = Array.prototype.findIndex.call(
			date,
			(char) => char === 'T'
		)
		const indexZone = Array.prototype.findIndex.call(
			date,
			(char) => char === 'Z'
		)
		const parseDate = date.slice(0, indexTime).split('-').reverse().join('-')
		const parseZone = date.slice(indexTime + 1, indexZone)
		return `${parseDate} ${parseZone}`
	}

	_transfromDataRepos = (data, totalPage) => {
		if (data.length === 0) {
			return {
				listItems: 'Not Found',
				totalPage,
			}
		}
		const listItems = data.map(
			({
				name,
				full_name,
				stargazers_count,
				updated_at,
				owner: { login, html_url },
			}) => ({
				name,
				fullName: full_name,
				login,
				stars: stargazers_count,
				dateCommit: this._transformDate(updated_at),
				urlAccount: html_url,
			})
		)
		const dataRepos = {
			totalCount: totalPage,
			listItems,
		}
		return dataRepos
	}
}
