const setLang = (lang) => {
	if (lang === 'en') {
		return {
			alert: {
				warning: {
					type: 'warning',
					title: 'Warning',
					text: 'Text length must be at least 5 characters',
				},
				success: {
					type: 'success',
					title: 'Success',
					text: {
						addItem: 'Node created successfully',
						removeItem: 'Item todo success deleted',
					},
				},
			},
			navbar: {
				title: 'Todo List',
				pages: ['Home', 'About'],
			},
			form: {
				title: {
					label: 'Enter case title:',
					placeholder: 'Please enter title case',
				},
				description: {
					label: 'Enter description case:',
					placeholder: 'Please enter new case',
				},
				button: 'Add item',
			},
			listItem: {
				itemNotFound: 'Elements list not found',
			},
			filterList: {
				search: {
					placeholder: 'Search by title or content',
				},
				buttons: ['All', 'Done', 'Active', 'Important'],
			},
			about: {
				title: 'Hello, my freinds!',
				subtitle: 'I am glad to welcome you on my page.',
				description:
					'This is my one of the first apps created with React and Redux. You can get more information about me on the portal GitHub',
				button: 'Learn more',
			},
		}
	} else {
		return {
			alert: {
				warning: {
					type: 'warning',
					title: 'Предупреждение',
					text: 'Длина текста должна быть не менее 5 символов',
				},
				success: {
					type: 'success',
					title: 'Успешно',
					text: {
						addItem: 'Заметка успешно создана',
						removeItem: 'Элемент списка успешно удален',
					},
				},
			},
			navbar: {
				title: 'Список дел',
				pages: ['Главная', 'Обо мне'],
			},
			form: {
				title: {
					label: 'Введите название дела:',
					placeholder: 'Пожалуйста введите название дела',
				},
				description: {
					label: 'Введите описание дела:',
					placeholder: 'Пожалуйста введите описание нового дела',
				},
				button: 'Добавить пункт',
			},
			listItem: {
				itemNotFound: 'Элементы списка не найдены',
			},
			filterList: {
				search: {
					placeholder: 'Поиск по заголовку или содержанию',
				},
				buttons: ['Все', 'Выполненные', 'Активные', 'Важные'],
			},
			about: {
				title: 'Привет, мои друзья!',
				subtitle: 'Я рад приветствовать Вас на моей странице.',
				description:
					'Это моё одно из первых приложений, созданных с помощью React и Redux. Вы можете получить больше информации обо мне на портале GitHub',
				button: 'Узнать подробнее',
			},
		}
	}
}

const onImportantOrDone = (arr, ident, propName) => {
	const index = arr.findIndex(({ id }) => id === ident)
	const newItem = {
		...arr[index],
		[propName]: !arr[index][propName],
	}
	return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
}

export { setLang, onImportantOrDone }
