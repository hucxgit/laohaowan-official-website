$(document).ready(function() {
  console.log("HELLO");
  initListener();
});

function initListener() {
  $('.android').on('click', function() {
    window.location.href = "http://zhushou.360.cn/detail/index/soft_id/3263452";
  });

  $('.iPhone').on('click', function() {
    window.location.href = "https://itunes.apple.com/us/app/lao-hao-wan-mei-tian-lai-dian/id1078595477?l=zh&ls=1&mt=8";
  });
}
