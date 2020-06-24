<template>
  <div>
      <table>
          <caption>学生成绩表</caption>
          <thead>
              <tr>
                  <th class="checkbox"> <input type="checkbox" name="" id=""> </th>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>成绩</th>
                  <th>成绩</th>
                  <th>成绩</th>
                  <th>成绩</th>
                  <th>成绩</th>
                  <th>成绩</th>
                  <th>成绩</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><input type="checkbox" name="" id=""></td>
                  <td>1</td>
                  <td>张aasasdasasdasasd三</td>
                  <td>88</td>
                  <td>8adasdas8</td>
                  <td>88</td>
                  <td>8asdasda8</td>
                  <td>88</td>
                  <td>8asdasdasd8</td>
                  <td>88</td>
              </tr>
          </tbody>
          <tfoot>

          </tfoot>
      </table>
  </div>
</template>

<script>
export default {

  data() {
    return {
      tableCate: [
        // {name:  }
      ]
    }
  }
  
}
</script>

<style lang="less" scoped>
  table {
      margin: 0 auto;
      width: 900px;
      border:1px solid #ebeef5;
       border-collapse: collapse;/*关键代码*/
  }

  input[type='checkbox']::after {
    // display: none;
    // opacity: 0;
    outline: none;
    border: none;
  }

  .checkbox {
    position: relative;
  }
  .checkbox::after {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // content: '\2714';
    color: #fff;
    border: 1px solid #666;
  }
  th,td {
      text-align: center;
      border: 1px solid #ebeef5;
      color: #606266;
      font-size: 14px;
      padding: 7px;
      box-sizing: border-box;
  }
</style>