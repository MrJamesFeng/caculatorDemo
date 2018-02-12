// pages/weather/weatherVC.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // var that = this
  // wx.getLocation({
  //   success: function(res) {
  //     console.log(res)
  //     that.loadCityNameByLL(res.latitude,res.longitude)
  //   },
  // })
  wx.getLocation({
    success: (res)=> {
      // console.log(res)
        this.loadCityNameByLL(res.latitude, res.longitude)
    },
  })
  },

  loadCityNameByLL:function(latitude,longitude){
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location='+latitude+',' + longitude + '&output=json',
      header:{
        'Content-Type': 'application/json'
      },
      success:(res)=>{
        console.log(res.data.result.addressComponent.city)
        this.lodaWeatherByCityName(res.data.result.addressComponent.city.replace("市",""))
      }
    })
  },
  lodaWeatherByCityName:function(cityName){
wx.request({
  url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + cityName,
  header: {
    'Content-Type': 'application/json'
  },
  success:(res)=>{
    console.log(res)
    this.setData({
      city: res.data.data.city, 
      today: res.data.data.forecast[0], 
      wendu: res.data.data.wendu +"℃",
      ganmao: res.data.data.ganmao
      })
    var forecast = []
    for (var i = 1; i < res.data.data.forecast.length;i++){
      forecast[i - 1] = res.data.data.forecast[i]
    }
    this.setData({
      forecast: forecast
    })
    console.log(this.data)
  }
})
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})