一、Table
    1、何时使用
    当有大量结构化的数据需要展现时；
    当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。
    2、调用事例:
        <v-table  :datalist="data" :headercolumns="columns" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
        @buttonClick="buttonClick"  @pagechange="pagechange"  @rowClick="rowClick"   @inlineClick="inlineClick"  @selectChange="selectChange"></v-table>
    3、传值事例:
        import utils from '../utils/utils.js'; // 枚举值翻译公共方法
        data(){
             return {
                    data :[
                      {key: '1',roleCode: 'JohnBrown',roleName: '约翰',roleType: '1', 
                      roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'], roleimg:[{key:'', style:'width:100px'}]},
                      {key: '2',roleCode: 'JimGreen',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'], button:[
                          {key: 'upload', value: '上传'},
                          {key: 'look', value: '查看', color: 'green'},
                          {key: 'edit', value: '修改', color: 'pink'},
                          {key: 'del', value: '删除', color: 'red'},
                      ]},
                      {key: '3',roleCode: 'JimGreen9',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '4',roleCode: 'JimGreen8',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '5',roleCode: 'JimGreen7',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '6',roleCode: 'JimGreen6',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '7',roleCode: 'JimGreen5',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '8',roleCode: 'JimGreen4',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'ceshu', color: 'green'}], roleicon:['step-backward'] },
                      {key: '9',roleCode: 'JimGreen3',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '10',roleCode: 'JimGreen2',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] },
                      {key: '11',roleCode: 'JimGreen1',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'] }
          ],
          columns: [
              {
                title: '角色代码',
                dataIndex: 'roleCode'
              },
              {
                title: '角色名称',
                dataIndex: 'roleName',
                 scopedSlots: { customRender: 'inlineButton' },  
              },
              {
                title: '角色类型',
                dataIndex: 'roleType',
                customRender: renderContent, // 渲染函数的规则
                scopedSlots: { customRender: 'inlineButton' },
              },
              {
                 title: '图标',
                 dataIndex: 'roleicon',
                 scopedSlots: { customRender: 'icon' },  
              },
              {
                title: 'Tags',
                key: 'roletags',
                dataIndex: 'roletags',
                scopedSlots: { customRender: 'tags' },
              },
              {
                title: '图片',
                key: 'roleimg',
                dataIndex: 'roleimg',
                scopedSlots: { customRender: 'img' },
              },
              {
                title: '操作',
                dataIndex: 'exre',
                scopedSlots: { customRender: 'exre' },
              },
          ],
          buttonItem: [
            {key: 'edit', value: '修改'},
            {key: 'del', value: '删除', color: 'red'},
          ],
          page: {
            current:1,
            total: 11
          }
        }
      },
      components: {
          vTable
      },
      methods:{
        // 表格组件操作按钮点击事件
         buttonClick($event){
              console.log($event)
         },
         // 表格组件翻页点击事件
         pagechange($event) {
          if($event===2) {
              this.data = [
                      {key: '2',roleCode: 'wabgo',roleName: '汪波',roleType: '2',exre: ['nice', 'developer'] },
                      {key: '3',roleCode: 'gshit',roleName: '郭柿彤',roleType: '2',exre: ['nice', 'developer'] },
                  ]
          }
         },
         // 表格组件整行点击事件
         rowClick($event){
            console.log($event);
         },
         // 特殊a标签点击事件
         inlineClick($event){
            console.log($event)
         },
         // table中checkbox选择数据
         selectChange($event) {
            console.log($event)
         },
    
      },
       created: function() {  
        }
     }
    }
    // 枚举值翻译方法，直接调用公共翻译方法， 传输类型即可
      const renderContent = (value) => {
                return utils.renderContent(value, 'role')
      }
            

    



属性 | 备注
---|---
datalist | table数据源，Array类型
headercolumns | table表头，Array类型
isbordered | table是否需要边框，boolean类型,默认false
buttonList | 操作栏按钮，Array类型
pageItem | 翻页参数，对象
rowSelect |  属性，table是否有选择框，默认false
ellipsis    |  表头属性，是否超长省略
customRender | 表头属性，列表翻译
buttonClick |  方法，点击操作栏具体操作方法
pagechange |  方法，翻页改变方法
rowClick |  方法，整行点击事件方法
inlineClick |  方法，单个a标签点击事件方法
selectChange |  rowSelect为true时才生效，获取选中的数据

注: headercolumns 对象中scopedSlots属性代表使用自定义属性，目前暂定四种类型
    
    1、 scopedSlots: { customRender: 'inlineButton' },  代表行内a标签高亮
    2、 scopedSlots: { customRender: 'icon' },  代表行内可使用icon图标,数据中传输图标即可,支持数组: ['step-backward']
    3、 scopedSlots: { customRender: 'tags' }, 代表行内可支持使用tags标签，数据中调用方法如下:[{key:'xxx', color: 'red'}, {key:'xxx', color: 'green'}],
    4、 scopedSlots: { customRender: 'img' }, 代表行内可支持使用图片，数据中调用方法如下:[{key:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604378189784&di=0ba5737a9139eeeab4721cad9e08def4&imgtype=0&src=http%3A%2F%2Fwww.qinzhiqiang.com%2Fwp-content%2Fuploads%2F2019%2F08%2F1565388160898_2.jpg', style:'width:100px'}]
    5、 scopedSlots: { customRender: 'exre' }, 代表需要操作栏表头，需要传输表头所需要的内容：
        buttonItem: [
            {key: 'edit', value: '修改'},
            {key: 'del', value: '删除', color: 'red'},
          ],
    如果需要做权限分析，比如某一行根据不同的权限拥有不同的按钮，即可在数据层自定义按钮来显示
        即: 在传输data数据的时候，进行自定义组装button
        {key: '2',roleCode: 'JimGreen',roleName: '春海',roleType: '2', roletags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], roleicon:['step-backward'], button:[
              {key: 'upload', value: '上传'},
              {key: 'look', value: '查看', color: 'green'},
              {key: 'edit', value: '修改', color: 'pink'},
              {key: 'del', value: '删除', color: 'red'},
          ]},
    
    PS：customRender可以自定义表头内容，示例如下:
    
        const columns = [{
            title: '搜索关键词',
            dataIndex: 'keyword',
            customRender: (text, row, index) => {
                if (index < 4) { // 前4行数据以a标签的形式被渲染
                  return <a href="javascript:;">{text}</a>
                }
                return { // 否则以独占4列的文本形式被渲染
                  children: text,
                  attrs: {
                    colSpan: 4
                  }
                }
            }]
 4、界面实例：
![image](http://note.youdao.com/yws/public/resource/29d65fc36f97fc39b8974e92c1c4df3d/xmlnote/1155D6DCA7D4498384BA78FAEEFBDEAC/8383)



二、query 万能查询
    1、何时使用
    当需要多种匹配筛选的时候，所用
    2、调用事例:
    <v-query :okText="okText" :headerDate="queryHeader" @getQuery="getQuery" @reset="resetQuery"></v-query> 
  属性 | 备注
  ---|---
  okText | query 控件按钮名称，默认‘查询’  类型: string
  headerDate |  query控件主要数据源，查询列表， 类型 array
  getQuery | query控件查询方法，筛选的原数组，用来发送给后台调用
  reset | query控件重置方法，点击重置是触发
 3、传值事例:
    queryHeader: [
        {label: '应用名称', value: 'app_name',  type: 'input',  filedType:  'string' },
        {label: '应用代码', value: 'app_id',  type: 'input',  filedType:  'string'},
        {label: '应用类型', value: 'app_type', type: 'select',  filedType:  'string', select:[
          {name: '服务应用', value: '0'},
          {name: '手机应用', value: '1'},
          {name: 'pc网页应用', value: '2'}
        ]},
        {label: '应用状态', value: 'status',  type: 'select',  filedType:  'string', dictId: 'SYS_APP_STAUTS'},
        {label: '运行系统', value: 'app_os',  type: 'select',  filedType:  'string', dictId: 'SYS_APP_OS'},
        {label: '应用描述', value: 'app_desc',  type: 'input',  filedType:  'string'}
      ],
      // query组件方法传递
      okText:'查询'
      
       // 万能查询查询方法
     getQuery($event) {
          console.log($event)
     },
     resetQuery() {
       alert("重置")
     }

三、面包屑控件
    1、何时使用
    每个组件所需的面包屑
    2、调用事例:
     <v-breadcrumb :breaditem="breadcrumbs"></v-breadcrumb>
属性 | 备注
---|---
breadcrumbs | 主要属性,传递面包屑所需要的原始数据
breadcrumbs.numtitle |  二级菜单名称
breadcrumbs.icon | 二级菜单图标
breadcrumbs.url | 二级菜单路由名称
breadcrumbs.isshow | 是否显示三级菜单名
breadcrumbs.numtitle1 | 三级菜单菜单名称
breadcrumbs.icon1 | 三级菜单路由图标
breadcrumbs.url1 | 三级菜单路由名称

 3、传值事例:

        breadcrumbs:{
        numtitle: '应用管理',
        icon:'user',
        url:'common',
        isshow:false
      },
      
      
      

三、tree控件
    1、何时使用
     文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
    2、调用事例:
    <v-tree :menuList="menuList" :treeFlatData="treeData" :ExpandAll="false" :menurightShow="false"
    @treeClick="treeClick" @treeRightClick="treeRightClick" @rightMenuClick="rightMenuClick"></v-tree>
属性 | 备注
---|---
menuList |  树菜单右击选择菜单
treeFlatData|  树结构原始数据
ExpandAll | 是否全部展开
menurightShow | 是否显示右击菜单
treeClick | 树点击方法
treeRightClick | 树右击点击方法
rightMenuClick  | 树右击菜单点击方法
expand | 树展开节点方法
 3、传值事例:
        menuList:[
            {label:'新增节点',value:'add'},
            {label:'新增子节点', value: 'addchild'},
            {label:'修改节点',value:'edit'},
            {label:'删除节点',value:'del'},
        ],
        treeData:{
          "system_flag": "Governor",
          "parent_id": "",
          "menu_name": "业务运营中心菜单",
          "show_name": "业务运营中心菜单",
          "menu_desc": "业务运营中心业务菜单主菜单",
          "menu_code": "MENU_AMC",
          "id": "415",
          "valid_flag": "0",
          "app_id": "amc"
      },
       {
          "system_flag": "Governor",
          "parent_id": "MENU_AMC_BM",
          "menu_name": "业务参数",
          "show_name": "业务参数",
          "icon": "border-outer",
          "menu_code": "MENU_AMC_PARAMETER",
          "id": "416",
          "valid_flag": "0",
          "app_id": "amc",
          "menu_seqno": "2"
    }]
    
    // 树左键点击事件， 不同内容切换右击内容
     treeClick($event) {
        if($event.data.id === 1){
            this.menuList = [
                {label:'新增节点',value:'add'},
                {label:'新增子节点', value: 'addchild'},
                {label:'修改节点',value:'edit'},
                {label:'删除节点',value:'del'}
            ]
        } else {
            this.menuList = [
                {label:'修改节点',value:'edit'},
                {label:'删除节点',value:'del'}
            ]
        }
     },
     // 树右击事件
     treeRightClick($event){
        console.log($event)
     },
     // 树右击菜单点击事件
     rightMenuClick($event) {
          console.log($event)
     }
     // 树展开事件
     expand($event) { // 其中$event.isexpand属性代表是展开还是收缩
       console.log($event)
     }
     
