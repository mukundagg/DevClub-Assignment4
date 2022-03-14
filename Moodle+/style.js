var ruleSheet = `
    * {
        font-family: "Roboto Mono" !important;
    }

    .navbar-inner {

    }

    .brand {
        font-weight: bold !important;
        color: rgba(0, 0, 0, .3) !important;
    }

    input[type^="submit"], .breadcrumb, button, .unstyled .btn {
        background: #fff !important;
        border: 1px solid #0070a8 !important;
        background: #fff !important;
        color: #0070a8 !important;
        border-radius: 100px !important;
        transform: skewX(-5deg);

    }

    input[type^="submit"]:hover, .unstyled .btn:hover, button:hover {
        text-decoration: none !important;
        background: rgba(0, 112, 168, .1) !important;
        transition: .3s;
        box-shadow: 0 0 5px 0 #aaa;
    }

    .breadcrumb {
        border-radius: 2.5px !important;
        background: #fff !important;
        transform: skewX(0deg) !important;
    }

    .breadcrumb-nav a:hover {
        color: #0070a8 !important;
    }

    .m-b-1 .btn-default {
        background: rgba(0, 112, 168, .05) !important;
        color: #0070a8;
        transform: skewX(-7.5deg);

    }

    .m-b-1 .active {
        background: rgba(0, 112, 168, .1) !important;
    }

    .nav-tabs>li>a {
        transform: skewX(-5deg);
        border-radius: 8px 8px 0 0 !important;
    }

    .hasevent {
        border-radius: 100px !important;
        font-weight: bold;
        background-color: rgba(0, 112, 168, .1) !important;
    }

    .block_online_users {
        max-height: 400px !important;
        min-height: 400px !important;
        overflow: hidden !important;
    }

    .block_online_users .list {
        max-height: 350px !important;
        min-height: 350px !important;
        overflow-y: scroll !important;
    }

    .block_online_users .list::-webkit-scrollbar {
        background: rgba(0, 0, 0, .05) !important;
        width: 6px;
    }
    
    .block_online_users .list::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,0); 
        border-radius: 10px;
    }
    
    .block_online_users .list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,0.2); 
    }

    .page-link {
        transform: skewX(-5deg);
    }

    #inst4 {
        background-color: rgba(255, 255, 255, .1);
        opacity: .87;
        background-image: radial-gradient(circle at center center, rgba(255, 255, 255, .3), rgba(0, 112, 168, .05)), repeating-radial-gradient(circle at center center, rgba(0, 112, 168, .05), rgba(0, 112, 168, .05), 10px, transparent 20px, transparent 10px);
        background-blend-mode: multiply;
    }

    .section {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .05)
    }

    .navbar-inner {
        background: linear-gradient(to top, #e2e2e2, #fff) !important;
        box-shadow: 0 0 15px 0 #aaa;
    }

    footer {
        border-radius: 2.5px;
        background: linear-gradient(to bottom, #e1e1e1, #fff) !important;
        background-blend-mode: color;
    }
`

var styleElem = document.createElement("style");
styleElem.innerText = ruleSheet;
document.body.appendChild(styleElem);

document.querySelector('.brand').innerText = "M00DLE+ IITD " + String(new Date().getFullYear() - 1) + "-" + String(new Date().getFullYear() - 2000);