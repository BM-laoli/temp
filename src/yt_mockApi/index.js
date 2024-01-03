const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const app = express();
const port = 3000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cors() );

const randomDelay = () => Math.floor( Math.random() * 2000 ) + 1000;
const wrapReturnData = ( res, data ) =>
{
  setTimeout( () =>
  {
    res.json( {
      data,
      success: true
    } );
  }, randomDelay() )
}
// 示例数据
const mockData = Array.from( { length: 100 }, ( _, i ) => ( {
  id: i + 1,
  name: `Item ${i + 1}`,
} ) );

app.use( express.json() );

// 分页API
app.post( '/api/items', ( req, res ) =>
{
  console.log( req.body )
  const { pageInfo = {}, queyInfo } = req.body;
  const { page = 1, pageSize = 10 } = pageInfo;
  const start = ( page - 1 ) * pageSize;
  const end = start + parseInt( pageSize );

  const paginatedData = mockData.slice( start, end );

  setTimeout( () =>
  {
    res.json( {
      data: paginatedData,
      pageInfo: {
        pageSize: Number( pageSize ),
        page: Number( page ),
        total: mockData.length,
      }
    } );
  }, randomDelay() )
} );

// 获取 司机信息发布的选择器数据
app.get( '/api/selectors', ( req, res ) =>
{
  // 随机生成一个 InterSelectType 对象
  function generateSelectType ()
  {
    const id = Math.random().toString( 36 ).substr( 2, 9 );
    const name = "Type " + Math.floor( Math.random() * 100 );
    const isSelected = Math.random() < 0.5; // 随机选择是否被选中
    return { id, name, isSelected };
  }

  // 生成包含随机数据的 InterPublishData 对象
  function generateRandomData ()
  {
    const vehicleType = Array.from( { length: 5 }, generateSelectType ); // 生成 5 个随机 InterSelectType 对象
    const shipmentType = Array.from( { length: 5 }, generateSelectType );
    const transportType = Array.from( { length: 5 }, generateSelectType );

    return { vehicleType, shipmentType, transportType };
  }

  setTimeout( () =>
  {
    res.json( {
      data: generateRandomData(),
      success: true
    } );
  }, randomDelay() )
} )

// 随机获取一个API 用来mock 测试一个API ( 获取短信验证码 )
app.get( '/api/verifyCode', ( req, res ) =>
{
  console.log('value ')
  setTimeout( () =>
  {
    res.json( {
      data: {
        code: Math.floor( Math.random() * 1000000 ),
      },
      success: true
    } );
  }, randomDelay() )
} )

app.get( '/api/message', ( req, res ) =>
{
  setTimeout( () =>
  {
    res.json( {
      data: {
        helpInfo: [
          {
            title: "如何开发票?",
            id: '1',
            type: '1',
            url:'http://18.208.174.187:8088/h5/Help?id=1'
          },
          {
            title: "如何注册云途油卡APP账号?",
            id: '2',
            type: '1',
            url:'http://18.208.174.187:8088/h5/Help?id=2'
          },
          {
            title: "云途APP登陆密码和支付密码有何不同？",
            id: '3',
            type: '1',
            url:'http://18.208.174.187:8088/h5/Help?id=3'
          },
        ],
        noticeInfo:[
          {
            title: '公告X',
            id: '1',
            type: '2',
            url:'http://18.208.174.187:8088/h5/Notice?id=1'
          },
          {
            title: "公告3?",
            id: '2',
            type: '1',
            url:'http://18.208.174.187:8088/h5/Notice?id=2'
          },
          {
            title: "公告X4",
            id: '3',
            type: '1',
            url:'http://18.208.174.187:8088/h5/Notice?id=3'
          },
        ]
      },
      success: true
    } );
  }, randomDelay() )
} )

app.get( '/api/detail', ( req, res ) =>
{
  setTimeout( () =>
  {
    res.json( {
      data: {
        title: '',
        content: '进入我的-发票申请界面，选中加油记录，进入发票申请界面，输入企业或个人单位信息、</br>, 总金额等，点击【确认开票】，开票成功， \n 然后系统根本输入的收件人信息，进行发票邮寄。',
        imgs: ['https://www.freeimg.cn/i/2024/01/03/659504ea98705.png','https://www.freeimg.cn/i/2024/01/03/659504ea98705.png', 'https://www.freeimg.cn/i/2024/01/03/659504f886688.png'],
        // imgType: 'one',
        imgType: 'two',
        video:'www/xxxxx.xxx'
      },
      success: true
    } );
  }, randomDelay() )
} )

app.listen( port, () =>
{
  console.log( `Server is running on port ${port}` );
} );