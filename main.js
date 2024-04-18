
const fsPromises = require('node:fs/promises');
 const path = require('node:path');
async function test() {
    try {
       await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir1'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir1', 'test1.txt'), 'This is first fail')
        console.log(path.resolve('dir1'));
        const stat1 = await fsPromises.stat(path.join(__dirname, 'baseFolder', 'dir1', 'test1.txt'))
        console.log(path.resolve(__dirname, 'test1.txt', stat1.isFile()? 'Fail' : 'Directory'));

        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir2'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir2', 'test2.txt'), 'This is second fail')
        console.log(path.resolve('dir2'));
        const stat2 = await fsPromises.stat(path.join(__dirname, 'baseFolder', 'dir2', 'test2.txt'))
        console.log(path.resolve(__dirname, 'test2.txt', stat2.isFile()? 'Fail' : 'Directory'));

        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir3'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir3', 'test3.txt'), 'This is third fail')
        console.log(path.resolve('dir3'));
        const stat3 = await fsPromises.stat(path.join(__dirname, 'baseFolder', 'dir3', 'test3.txt'))
        console.log(path.resolve(__dirname, 'test3txt', stat3.isFile()? 'Fail' : 'Directory'));

        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir4'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir4', 'test4.txt'), 'This is four fail')
        console.log(path.resolve('dir4'));
        const stat4 = await fsPromises.stat(path.join(__dirname, 'baseFolder', 'dir4', 'test4.txt'))
        console.log(path.resolve(__dirname, 'test4.txt', stat4.isFile()? 'Fail' : 'Directory'));

        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir5'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir5', 'test5.txt'), 'This is fife fail')
        console.log(path.resolve('dir5'));
        const stat5 = await fsPromises.stat(path.join(__dirname, 'baseFolder', 'dir5', 'test5.txt'))
        console.log(path.resolve(__dirname, 'test5.txt', stat5.isFile()? 'Fail' : 'Directory'));
    }catch (e) {
        console.error(e)
    }
}

// async function testWrite() {
//    try {//
//        await fsPromises.readdir('./', (err, files) => {
//            for (let file of files) {
//                console.log(file.name, file.isFile() ? 'Fail' : 'Directory');
//            }
//        });
//
//    }catch (e) {
//        console.error(e)
//     }
// }

void test();
// void testWrite();