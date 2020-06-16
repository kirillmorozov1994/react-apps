const show = (alert) => {
	return {
		type: 'SHOW_ALERT',
		payload: alert,
	}
}

const hide = () => {
	return {
		type: 'HIDE_ALERT',
	}
}

export { show, hide }
