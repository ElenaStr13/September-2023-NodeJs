const foo = () => {
    console.log(__dirname)
    console.log(__filename)
    console.log(process.cwd())
}
foo()
module.exports = { foo };