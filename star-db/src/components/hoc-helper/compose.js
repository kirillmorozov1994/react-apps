export default (...func) => (comp) => {
	return func.reduceRight((prevResult, f) => {
		return f(prevResult)
	}, comp)
}
