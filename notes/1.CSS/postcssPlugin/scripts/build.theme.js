const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
// 1. 通过npm run build:theme -- 1234 将色卡的 ID 传入进来
// 2. 通过id将指定色卡下载到本地的指定目录里，如果不传的话就拉去默认色卡
// 3. 下载完成后进行正常的打包流程
const args = yargs(hideBin(process.argv)).argv;
const path = require.resolve('./build.js');
console.log('args', args, path);


// 将文件从cdn上下载到指定目录下
// const OSS = require('ali-oss');

// const client = new OSS({
//   // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
//   region: 'yourRegion',
//   // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
//   accessKeyId: 'yourAccessKeyId',
//   accessKeySecret: 'yourAccessKeySecret',
//   // 填写Bucket名称。
//   bucket: 'examplebucket'
// });

// async function get () {
//   try {
//     // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
//     // 如果指定的本地文件存在会覆盖，不存在则新建。
//     // 如果未指定本地路径，则下载后的文件默认保存到示例程序所属项目对应本地路径中。
//     const result = await client.get('exampleobject.txt', 'D:\\localpath\\examplefile.txt');
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//   }
// }

// get(); 