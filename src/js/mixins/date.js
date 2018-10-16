/**
 *  描述：混合类
 */

export default {
  data () {
    return {
      disabledDate: {
        disabledDate (day) {
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let date = now.getDate();
          if (month > 3) {
            month -= 3;
          } else {
            month = 12 + (month - 3);
            year = year - 1;
          }
          switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
              if (date > 30) date = 30;
              break;
            case 2:
              if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                if (date > 29) date = 29;
              } else {
                if (date > 28) date = 28;
              }
              break;
          }
          let days = new Date(`${year}-${month}-${date}`).getTime();
          return day && day.valueOf() > Date.now() || day.valueOf() < days;
        }
      },
      reportDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      reportDate1: {
        disabledDate (day) {
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let date = now.getDate();
          if (month > 3) {
            month -= 3;
          } else {
            month = 12 + (month - 3);
            year = year - 1;
          }
          switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
              if (date > 30) date = 30;
              break;
            case 2:
              if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                if (date > 29) date = 29;
              } else {
                if (date > 28) date = 28;
              }
              break;
          }
          let days = new Date(`${year}-${month}-${date}`).getTime();
          return day && day.valueOf() > Date.now() - 86400000 || day.valueOf() < days - 86400000;
        }
      },
      disabledTime: {   // 历史国标
        disabledDate (day) {
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let date = now.getDate();
          if (month > 3) {
            month -= 3;
          } else {
            month = 12 + (month - 3);
            year = year - 1;
          }
          switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
              if (date > 30) date = 30;
              break;
            case 2:
              if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                if (date > 29) date = 29;
              } else {
                if (date > 28) date = 28;
              }
              break;
          }
          let days = new Date(`${year}-${month}-${date}`).getTime();
          return day && day.valueOf() < days;
        }
      },
      disabledVehicleOpe: {   // 车辆运行统计
        disabledDate (day) {
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let date = now.getDate();
          if (month > 6) {
            month -= 6;
          } else {
            month = 12 + (month - 6);
            year = year - 1;
          }
          switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
              if (date > 30) date = 30;
              break;
            case 2:
              if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                if (date > 29) date = 29;
              } else {
                if (date > 28) date = 28;
              }
              break;
          }
          let days = new Date(`${year}-${month}-${date}`).getTime();
          return day && day.valueOf() > Date.now() || day.valueOf() < days;
        }
      }
    };
  },
  methods: {
    checkDate (date1, date2, day) {
      let num = Math.abs(date2 - date1);
      let days = Math.ceil(num / (1000 * 3600 * 24));
    //  console.log(days, day);
      if (days > day) {
        return false;
      } else {
        return true;
      }
    },
    // 开始时间，结束时间， 小时
    checkTime (start, end, hour) {
      if (end - start > (hour * 3600 * 1000)) return false;
      else return true;
    }
  }
};
