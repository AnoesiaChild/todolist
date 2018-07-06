let vm = new Vue({
    el: '#app',
    directives:{
        focus(el,bindings){
            if(bindings.value){
                el.focus();
            }
        }
    },
    created(){ //ajax获取  初始化数据
        //如果localStorage中有数据 就用有的数据 没有就用默认的
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        //监控hash的变化，如果页面已经有hash了，重新刷新页面也要获取hash值
        window.addEventListener('hashchange',()=>{
            this.hash = window.location.hash.slice(2);
        },false)
    },
    watch:{ //watch默认只监控一层的数据变化，
        todos:{ //深度监控将函数写成对象形式
            handler(){ //默认写成函数 就相当于默认写了个handler
                localStorage.setItem('data',JSON.stringify(this.todos))
            },deep:true
        }
        
    },
    data: {
       todos:[
            {
               isSelected:false,
               title:'睡觉'
            },
            {
                isSelected:false,
                title:'吃饭'
            }
       ],
       title:"",
       cur:'',
       hash:'all'
    },
    methods:{
        add(){
            if(this.title){
               this.todos.push({
                    isSelected: false,
                    title:this.title
                })
                this.title=''; 
            }
        },
        remove(todo){
            this.todos = this.todos.filter(item=>item!=todo);
        },
        remember(todo){
            this.cur = todo;
        },
        cancel(){
            this.cur = '';
        }
    },
    computed:{
        count(){
            return this.todos.filter(item=>!item.isSelected).length
        },
        filterTodos(){
            if(this.hash === 'all') {return this.todos};
            if(this.hash === 'finish') {return this.todos.filter(item=>item.isSelected)};
            if(this.hash === 'unfinish') {return this.todos.filter(item=>!item.isSelected)};
            return this.todos
        }
    }
})
//1将数据循环到页面上
//2敲回车是填加新数据（需要加入isSelected属性）
//3删除功能
//4计算当前为完成的工作个数