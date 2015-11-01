// Helper functions
function replaceUrlParam(url, paramName, paramValue) {
  var pattern = new RegExp('('+paramName+'=).*?(&|$)'),
      newUrl = url.replace(pattern,'$1' + paramValue + '$2');
  if ( newUrl == url ) {
    newUrl = newUrl + (newUrl.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
  }
  return newUrl;
}


// Filters
$(document).ready(function(){   
  addFilterEffect();    
});

function addFilterEffect(){
  if($("#filters").hasClass('ajax-filter')){

    if($('.filter-list').length){
      $('.filter').each(function(){
        dataGroup = $(this).data('group');
        if(dataGroup != "Vendor"){
          activeFilter='';
          if($(this).hasClass('active')) 
            activeFilter=' checked="checked"';

          $('a', $(this)).each(function(){
            var dataHandle = $(this).parent().data("handle");
            $('<input class="filterval" type="checkbox" name='+dataGroup+activeFilter+' value="'+dataHandle+'"/>').insertBefore($(this));
            $(this).click(function(event){
              chkVal = $(this).parent().find('.filterval');
              chkVal.prop("checked", !chkVal.prop("checked"));
              $(this).parent().toggleClass("active");
              FilterLoadResult();
              return false;
            });
          })
          
        }
      });
    }

    //add ajax for sort
    $("#sort-by").change(function(event){
      event.preventDefault();

      var url      = window.location.href;
      url = replaceUrlParam(url, 'sort_by', $(this).val());

      processCollectionAjax(url);
      return false;
    });

    pagingCollection();
  }
}

function FilterLoadResult(){
  var url      = window.location.href;
  var constraint = '';

  $('.filterval').each(function(){
    if($(this).is(":checked"))
      constraint += !constraint?$(this).val().toLowerCase():"+"+$(this).val().toLowerCase();
  });
  url = replaceUrlParam(url, 'constraint', constraint);
  processCollectionAjax(url);
}

function processCollectionAjax(url){
  $.ajax({
    type: 'GET',
    url: url,
    data: {},
    beforeSend:function(){
      $('.products').addClass('loading');
    },
    complete: function (data) {
      $('.products').html($(".products", data.responseText).html());
      $('.products').removeClass('loading');

      history.pushState({
        page: url
      }, url, url);
      pagingCollection();
    }
  });
}

function pagingCollection(){
  activeNumber = parseInt($('#pagi .pagination li.active span').html());

  $('#pagi .pagination a').click(function(){
    var pageNumber = 0;
    //previous

    if($(this).parent().hasClass('pagination_previous')){
      pageNumber = activeNumber-1;
    }
    //next
    else if($(this).parent().hasClass('pagination_next')){
      pageNumber = activeNumber+1;
    }
    //normal paging
    else{
      pageNumber = parseInt($(this).html());
    }
    if(pageNumber >0){
      var url      = window.location.href;
      url = replaceUrlParam(url, 'page', pageNumber);

      processCollectionAjax(url);
    }
    return false;
  });
}