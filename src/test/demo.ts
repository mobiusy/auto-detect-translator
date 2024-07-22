const name = '李四';
const description = '爱Coding的男人, 最近快吃不上饭了, BE';
const age = '30';
const email = 'lisi@example.com'; // 假设的邮箱地址
const combined = `${name} ${description} ${age} ${email} test`;

/**
 * 打印个人信息
 * @param name 姓名
 * @param description 描述
 * @param age 年龄
 * @param email 邮箱
 * @returns void
 */
function printInfo(name: string, description: string, age: string, email: string) {
  // print all user info
  // 这里就已经结束了
  console.log(`姓名: ${name}`);
  console.log(`描述: ${description}`);
  console.log(`年龄: ${age}`);
  console.log(`邮箱: ${email}`);

}

/** 调用方法 */
printInfo(name, description, age, email);