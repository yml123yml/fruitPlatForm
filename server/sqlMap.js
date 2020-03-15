// sql语句
var sqlMap = {
  admin: {
    select_name: 'select * from admin where userName = ?',
    select_password: 'select * from admin where passWord = ?'
  },
  allFruit: {
    query: 'select * from allFruit',
    delete: 'delete from allFruit where id = ?',
    addFruit: 'insert into allFruit(pic,title,description,tip,price,proDetailImg1,proSwipeImg1,proSwipeImg2,proSwipeImg3) values(?,?,?,?,?,?,?,?,?)',
    // update: 'update allFruit set pic=?,title=?,description=?,tip=?,price=?,proDetailImg1=?,proSwipeImg1=?,proSwipeImg2=?,proSwipeImg3=? where id = ?'
    update: 'update allFruit set title=?,description=?,tip=?,price=? where id = ?'
  },
  hotFruit: {
    query: 'select * from hotfruit',
    delete: 'delete from hotfruit where id = ?',
    addFruit: 'insert into hotfruit(pic,title,description,tip,price,num) values(?,?,?,?,?,?)',
    update: 'update hotfruit set title=?,description=?,tip=?,price=?,num=? where id = ?'
  },
  importFruit: {
    query: 'select * from importfruit',
    delete: 'delete from importfruit where id = ?',
    addFruit: 'insert into importfruit(pic,title,description,tip,price,num) values(?,?,?,?,?,?)',
    update: 'update importfruit set title=?,description=?,tip=?,price=?,num=? where id = ?'
  },
  landmankFruit: {
    query: 'select * from landmankfruit',
    delete: 'delete from landmankfruit where id = ?',
    addFruit: 'insert into landmankfruit(pic,title,description,tip,price,num) values(?,?,?,?,?,?)',
    update: 'update landmankfruit set title=?,description=?,tip=?,price=?,num=? where id = ?'
  },
  seasonalFruit: {
    query: 'select * from seasonalfruit',
    delete: 'delete from seasonalfruit where id = ?',
    addFruit: 'insert into seasonalfruit(pic,title,description,tip,price,num) values(?,?,?,?,?,?)',
    update: 'update seasonalfruit set title=?,description=?,tip=?,price=?,num=? where id = ?'
  },
  twoFruit: {
    query: 'select * from twofruit',
    delete: 'delete from twofruit where id = ?',
    addFruit: 'insert into twofruit(pic,title,description,tip,price,num) values(?,?,?,?,?,?)',
    update: 'update twofruit set title=?,description=?,tip=?,price=?,num=? where id = ?'
  },
  banner: {
    query: 'select * from banner',
    delete: 'delete from banner where id = ?',
    addFruit: 'insert into banner(proImg,proName,proChar,proPrice,proOldprice,proDetailImg1,proDetailImg2,proSwipeImg1,proSwipeImg2,proSwipeImg3,proSwipeImg4) values(?,?,?,?,?,?,?,?,?,?,?)',
    update: 'update banner set proName=?,proChar=?,proPrice=?,proOldprice=? where id = ?'
  },
  tuijian: {
    query: 'select * from tuijian',
    delete: 'delete from tuijian where id = ?',
    addFruit: 'insert into tuijian(picture,saletip,name,price,proDetailImg1,proDetailImg2,proSwipeImg1,proSwipeImg2,proSwipeImg3) values(?,?,?,?,?,?,?,?,?)',
    update: 'update tuijian set saletip=?,name=?,price=? where id = ?'
  },
  heavyrecommend: {
    query: 'select * from heavyrecommend',
    delete: 'delete from heavyrecommend where id = ?',
    addFruit: 'insert into heavyrecommend(thumb,bigTitle1,bigTitle2,littleTitle,price,num,proDetailImg1,proDetailImg2,proSwipeImg1,proSwipeImg2,proSwipeImg3) values(?,?,?,?,?,?,?,?,?,?,?)',
    update: 'update heavyrecommend set bigTitle1=?,bigTitle2=?,littleTitle=?,price=?,num=? where id = ?'
  }
}

module.exports = sqlMap
