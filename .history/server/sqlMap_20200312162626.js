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
    update: 'update allFruit set pic=?,title=?,description=?,tip=?,price=?,proDetailImg1=?,proSwipeImg1=?,proSwipeImg2=?,proSwipeImg3=? where id = ?'
  }
}

module.exports = sqlMap
