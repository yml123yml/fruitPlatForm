// sql语句
var sqlMap = {
  user: {
    // 添加用户
    add: 'insert into user(userName, passWord) values (?, ?)',
    // 查询用户和密码
    select_name: 'select * from user where userName = ?',
    select_password: 'select * from user where passWord = ?'
  },
  tuijian: {
    selectPro: 'select * from tuijian', // 滑动推荐
    heavyPro: 'select * from heavyRecommend' // 重磅推荐
  },
  category: {
    hotFruit: 'select * from hotFruit', // 热销水果
    importFruit: 'select * from importFruit', // 进口水果
    landmankFruit: 'select * from landmankFruit', // 地标水果
    twoFruit: 'select * from twoFruit', // 买一赠一水果
    seasonalFruit: 'select * from seasonalFruit', // 时令水果
    allFruit: 'select * from allFruit',
    apple: 'select * from allFruit where tip like "%苹果%" ',
    dongzao: 'select * from allFruit where tip like "%枣%" or tip like "%眼%" ',
    huolongguo: 'select * from allFruit where tip like "%火龙果%" ',
    jinju: 'select * from allFruit where tip like "%金桔%" or tip like "柠檬" ',
    liulian: 'select * from allFruit where tip like "%榴莲%" ',
    mangguo: 'select * from allFruit where tip like "%芒果%" ',
    migua: 'select * from allFruit where tip like "%瓜%" ',
    orange: 'select * from allFruit where tip like "%橙子%" ',
    pipa: 'select * from allFruit where tip like "%枇杷%" or tip like "%芭乐%" ',
    qiyiguo: 'select * from allFruit where tip like "%奇异%" ',
    shiliu: 'select * from allFruit where tip like "%石榴%" or tip like "%山竹%" ',
    strawberry: 'select * from allFruit where tip like "%莓%" '
  },
  banner: {
    allBanner: 'select * from banner'
  },
  search: {
    searchAllFruit: 'select * from allFruit'
  },
  cart: {
    addCart: 'insert into cart(title, price, oldprice, num, pic) values (?, ?, ?, ?, ?)',
    allCart: 'select * from cart'
  },
  productList: {
    allList: 'select * from productList'
  },
  admin: {
    select_name: 'select * from admin where userName = ?',
    select_password: 'select * from admin where passWord = ?'
  },
  allFruit: {
    query: 'select * from allFruit'
  }
}

module.exports = sqlMap
