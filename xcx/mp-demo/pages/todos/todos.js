const { formatTime } = require('../../utils/util.js')

Page({
  data: {
    todo: {},
    todos: [
      {
        content: '今天出去玩',
        startDate: '2020-04-28',
        startTime: 1588058212456,
        endDate: '2020-04-29',
        endTime: 1588089600000,
        status: 0
      }, 
      {
        content: '今天写博客',
        startDate: '2020-04-28',
        startTime: 1588058212456,
        endDate: '2020-04-29',
        endTime: 1588089600000,
        status: 1
      }
    ],
    handleTodo(event) {
      console.log(event);
      const { position } = event.detail;
      switch(position) {
        case 'left': {
          console.log('左边打开了')
          // 代办完成，将该代办从 todos 数组中删除，并且添加到 finishedTodos 中
          let { index, id, name } = event.target.dataset;
          let todos = this.data.todos
          let finishedTodos = this.data.finishedTodos
          todos.splice(index, 1)
          finishedTodos.push({ id, name })
          this.setData({
            todos: todos,
            finishedTodos: finishedTodos
          })
          break;
        }
        case 'right': {
          console.log('右边打开了')
          // 删除代办，将该代办从 todos 数组中删除
          console.log(event)
          let {index, id} = event.target.dataset;
          let todos = this.data.todos
          todos.splice(index, 1)
          this.setData({
            todos: todos
          })
          break;
        }
      }
    },
    finishedTodos: [],
    unfinishedTodos: [],
    // 显示新增代办弹窗
    showTodo: false,
    // 显示开始时间弹窗
    showStartDate: false,
    // 显示结束时间弹窗
    showEndDate: false,

    // 当前日期
    currentDate: new Date().getTime(),
    // 最小日期
    minDate: new Date().getTime(),
    // 日期格式
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  // 显示代办弹窗
  showTodoPopup: function(e) {
    this.setData({
      showTodo: true
    })
  },
  // 关闭代办弹窗
  closeTodoPopup: function(e) {
    this.setData({
      showTodo: false,
      todo: {}
    })
  },
  // 保存代办窗口内容：TODO 应该将 todo 对象提交到服务器存储
  saveTodoPopup: function(e) {
    let todo = this.data.todo
    let todos = this.data.todos

    todo.status = 0
    todos.push(todo)

    this.setData({
      todo: {},
      todos: todos,
      showTodo: false
    })
  },
  // 待办内容输入
  inputContent: function(e) {
    this.setData({
      ['todo.content']: e.detail
    })
  },
  // 显示开始时间弹窗
  showStartDatePopup: function (e) {
    this.setData({
      showStartDate: true
    })
  },
  // 确认开始时间弹窗
  confirmStartDatePopup: function (e) {
    const startTime = e.detail
    const startDate = formatTime(new Date(e.detail)).substring(0, 10)

    this.setData({
      showStartDate: false,
      ['todo.startDate']: startDate,
      ['todo.startTime']: startTime
    })
  },
  // 取消开始时间弹窗
  cancelStartDatePopup: function () {
    this.setData({
      showStartDate: false
    })
  },
  // 显示结束时间弹窗
  showEndDatePopup: function(e) {
    this.setData({
      showEndDate: true
    })
  },
  // 确认结束时间弹窗
  confirmEndDatePopup: function(e) {
    const endTime = e.detail
    const endDate = formatTime(new Date(e.detail)).substring(0, 10)
    
    this.setData({
      showEndDate: false,
      ['todo.endDate']: endDate,
      ['todo.endTime']: endTime
    })
  },
  // 取消结束时间弹窗
  cancelEndDatePopup: function () {
    this.setData({
      showEndDate: false
    })
  },
  handleTodo(event) {
    console.log(event)
  }
})