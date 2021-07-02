// @ts-nocheck

import hbs from "handlebars";

const template = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>vite-plugin-vue-docs</title>
    <style>
        .van-doc-content{position:relative;-webkit-flex:1;flex:1;padding:0 0 75px}.van-doc-content .card{margin-bottom:24px;padding:24px;background-color:#fff;border-radius:20px;box-shadow:0 8px 12px #ebedf0}.van-doc-content a{margin:0 1px;color:#1989fa;-webkit-font-smoothing:auto}.van-doc-content a:hover{color:#0570db}.van-doc-content a:active{color:#0456a9}.van-doc-content h1,.van-doc-content h2,.van-doc-content h3,.van-doc-content h4,.van-doc-content h5,.van-doc-content h6{color:#323233;font-weight:400;line-height:1.5}.van-doc-content h1[id],.van-doc-content h2[id],.van-doc-content h3[id],.van-doc-content h4[id],.van-doc-content h5[id],.van-doc-content h6[id]{cursor:pointer}.van-doc-content h1{margin:0 0 30px;font-size:30px;cursor:default}.van-doc-content h2{margin:45px 0 20px;font-size:25px}.van-doc-content h3{margin-bottom:16px;font-weight:600;font-size:18px}.van-doc-content h4{margin:24px 0 12px;font-weight:600;font-size:16px}.van-doc-content h5{margin:24px 0 12px;font-weight:600;font-size:15px}.van-doc-content p{color:#34495e;font-size:15px;line-height:26px}.van-doc-content table{width:100%;margin-top:12px;color:#34495e;font-size:14px;line-height:1.5;border-collapse:collapse}.van-doc-content table th{padding:8px 10px;font-weight:600;text-align:left}.van-doc-content table th:first-child{padding-left:0}.van-doc-content table th:last-child{padding-right:0}.van-doc-content table td{padding:8px;border-top:1px solid #f1f4f8}.van-doc-content table td:first-child{padding-left:0}.van-doc-content table td:first-child code{margin:0;padding:2px 6px;color:#1989fa;font-weight:600;font-size:11px;background-color:rgba(25,137,250,.1);border-radius:20px}.van-doc-content table td:last-child{padding-right:0}.van-doc-content table em{color:#4fc08d;font-size:14px;font-family:Source Code Pro,Monaco,Inconsolata,monospace;font-style:normal;-webkit-font-smoothing:auto}.van-doc-content ol li,.van-doc-content ul li{position:relative;margin:5px 0 5px 10px;padding-left:15px;color:#34495e;font-size:15px;line-height:26px}.van-doc-content ol li:before,.van-doc-content ul li:before{position:absolute;top:0;left:0;box-sizing:border-box;width:6px;height:6px;margin-top:10px;border:1px solid #666;border-radius:50%;content:""}.van-doc-content hr{margin:30px 0;border:0;border-top:1px solid #eee}.van-doc-content li>code,.van-doc-content p>code,.van-doc-content table code{display:inline;margin:0 2px;padding:2px 5px;font-size:14px;font-family:inherit;word-break:keep-all;background-color:#f7f8fa;border-radius:4px;-webkit-font-smoothing:antialiased}.van-doc-content p>code{font-size:14px}.van-doc-content section{padding:24px;overflow:hidden}.van-doc-content blockquote{margin:16px 0 0;padding:16px;background-color:#ecf9ff;border-radius:20px}.van-doc-content img{width:100%;margin:16px 0;border-radius:20px}.van-doc-content--changelog strong{display:block;margin:24px 0 12px;font-weight:600;font-size:15px}.van-doc-content--changelog h3+p code{margin:0}.van-doc-content--changelog h3 a{color:inherit;font-size:20px}
    </style>
    <style>
        body{min-width:1100px;overflow-x:auto;color:#323233;font-size:16px;font-family:Open Sans,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,PingFang SC,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif;background-color:#f7f8fa;-webkit-font-smoothing:antialiased}body,p{margin:0}h1,h2,h3,h4,h5,h6{margin:0;font-size:inherit}ol,ul{margin:0;padding:0;list-style:none}a{text-decoration:none}.van-doc-row{width:100%}@media(min-width:1680px){.van-doc-row{width:1680px;margin:0 auto}}
    </style>  
</head>
<body>
<div class="van-doc">
    <div class="van-doc-container van-doc-row van-doc-container--with-simulator">
        <div class="van-doc-content van-doc-content--common">
            <section>
                <h1>组件名</h1>
                {{#if props}}
                    <div class="card">
                        <h3 id="props">{{props.h3}}</h3>
                        <table>
                            <thead>
                                <tr>
                                    {{#each props.table.headers}}
                                        <th>{{this}}</th>
                                    {{/each}}
                                </tr>
                            </thead>
                            <tbody>
                                {{#each props.table.rows}}
                                    <tr>
                                        {{#each this}}
                                            <td>{{handleType}}</td>
                                        {{/each}}
                                    </tr>
                                {{/each}}
                            </tbody>
                        </table>
                    </div>
                {{/if}}
                {{#if emits}}
                    <div class="card">
                        <h3 id="props">{{emits.h3}}</h3>
                        <table>
                            <thead>
                                <tr>
                                    {{#each emits.table.headers}}
                                        <th>{{this}}</th>
                                    {{/each}}
                                </tr>
                            </thead>
                            <tbody>
                                {{#each emits.table.rows}}
                                    <tr>
                                        {{#each this}}
                                            <td>{{this}}</td>
                                        {{/each}}
                                    </tr>
                                {{/each}}
                            </tbody>
                        </table>
                    </div>
                {{/if}}
            </section>
        </div>
    </div>
</div>
</body>
</html>`;

hbs.registerHelper("handleType", function (options) {
  switch (options.data.index) {
    case 2: {
      return new hbs.SafeString(`<em>${this}</em>`);
    }
    case 4: {
      return new hbs.SafeString(`<code>${this}</code>`);
    }
    default: {
      return this;
    }
  }
});

export default hbs.compile(template);
