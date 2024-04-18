
const fsPromises = require('node:fs/promises');
 const path = require('node:path');
async function test() {
    try {
       await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir1'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir1', 'test1.txt'), 'This is first fail')
        console.log(path.resolve('dir1'));
        console.log(path.resolve(__dirname, 'test1.txt'));
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir2'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir2', 'test2.txt'), 'This is second fail')
        console.log(path.resolve('dir2'));
        console.log(path.resolve(__dirname, 'test2.txt'));
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir3'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir3', 'test3.txt'), 'This is third fail')
        console.log(path.resolve('dir3'));
        console.log(path.resolve(__dirname, 'test3.txt'));
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir4'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir4', 'test4.txt'), 'This is four fail')
        console.log(path.resolve('dir4'));
        console.log(path.resolve(__dirname, 'test4.txt'));
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'dir5'), {recursive: true})
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'dir5', 'test5.txt'), 'This is fife fail')
        console.log(path.resolve('dir5'));
        console.log(path.resolve(__dirname, 'test5.txt'));
    }catch (e) {
        console.error(e)
    }
}

async function testWrite() {
   try {

       await fsPromises.readdir('./', (err, files) => {
           for (let file of files) {
               console.log(file.name, file.isFile() ? 'Fail' : 'Directory');
           }
       });

   }catch (e) {
       console.error(e)
    }
}

void test();
void testWrite();