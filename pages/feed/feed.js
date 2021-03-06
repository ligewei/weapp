// feed.js

var app = getApp()

Page({
  data: {
    list: [],
    userInfo: {},
    toastHidden: true,
    pageNum: 1,
    plain: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    let that = this;
    wx.request({
      url: 'https://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=' + that.data.pageNum,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          header: '最新无聊图',
          list: that.data.list.concat(res.data.comments)
        })
      }
    })
    this.index = 1
  },
  loadMore: function (event) {
    let that = this;
    that.data.pageNum++;
    console.log(that.data.pageNum);
    that.setData({ loading: true });
    wx.request({
      url: 'https://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=' + that.data.pageNum,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(that.data.list.length);
        console.log(res.data.comments.length);
        console.log("====");
        that.setData({
          loading: false,
          header: '最新无聊图',
          list: that.data.list.concat(res.data.comments)
        })
      }
    })
  },
  clickPositive: function (event) {
    let that = this;
    wx.request({
      url: 'https://i.jandan.net/index.php?acv_ajax=true&option=1',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        ID: event.target.dataset.postid
      },
      success(res) {
        console.log(res.data.includes("THANK YOU"))
        if (res.statusCode == 200) {
          if (res.data.includes("THANK YOU")) {
            wx.showToast({
              title: '投票成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '已经投过票',
              icon: 'loading',
              duration: 1500
            })
          }
        }
        else {
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  clickNegative: function (event) {
    let that = this;
    wx.request({
      url: 'https://i.jandan.net/index.php?acv_ajax=true&option=0',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        ID: event.target.dataset.postid
      },
      success(res) {
        console.log(res.data.includes("THANK YOU"))
        if (res.statusCode == 200) {
          if (res.data.includes("THANK YOU")) {
            wx.showToast({
              title: '投票成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '已经投过票',
              icon: 'loading',
              duration: 1500
            })
          }
        }
        else {
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
})