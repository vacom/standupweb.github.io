(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-29237910-9', 'auto');
  ga('send', 'pageview');
  
  
 
  $(".suw-dropdown li a" ).click(function() {
       var option = $(this).text();
       console.log(option);
       $(".dropdown-toggle").html("Tags - "+option+ " <span class='caret'>");
       
        if(option == "All"){
            $("p.post-tags").parent().parent().show();
        }else{
            if ($("p."+option).length) {
                    $("p.post-tags").parent().parent().hide();
                    $("p."+option).parent().parent().show();
                    // $("p.post-tags").parent().parent().removeClass("animated fadeOutRight");
                    $("p.post-tags").parent().parent().addClass("animated fadeInUp");
                    console.log("encontrou");
                }else {
                    //$("p.post-tags").parent().parent().removeClass("animated fadeInUp");
                    //$("p.post-tags").parent().parent().addClass("animated infinite  fadeOutRight");
                    $("p.post-tags").parent().parent().hide();
                    console.log("nao encontrou");
                }
        }
      
  });
  


function sendMail(name,url,urlimg,tags,email) {

    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': 'XYqyqsy0lF7alFxi2QvmQQ',
            'message': {
                'from_email': email.toString() ,
                'to': [
                    {
                        'email': 'vitor.works@gmail.com',
                        'name': 'Resource name = ' + name.toString(),
                        'type': 'to'
                    }
                ],
                'autotext': 'true',
                'subject': name.toString() + ' - Resource name',
                'html': name.toString() + ' </br> url ' + url.toString() + ' </br> urlimg ' + urlimg.toString() + ' </br> tags ' + tags.toString()
            }
        }
    }).done(function(response) {
        console.log(response); // if you're into that sorta thing

    });

    return true;
}

$( "#sendProject" ).click(function() {

    var name = $('#name').val();
    var email = $('#email').val();
    var url = $('#url').val();
    var urlimg = $('#url-img').val();
    var tags = $('#tags').val();


    if(email == ""){
       console.log('Must fill in the Email and Message area!');
    }else{

       var sended = sendMail(name,url,urlimg,tags,email);
      
      var sended = true;

        if(sended){
           $('#name').val("");
           $('#email').val("");
           $('#url').val("");
           $('#url-img').val("");
           $('#tags').val("");
            
            console.log('Email sent with success, Thank you!');
            $('#submitProjectModal').modal('toggle');
        }else{
            console.log('email was not sent successfully!');
        }

    }
});


function suwTimeline(arr) {
    var content = "";
    var i;
    for(i = 0; i < arr.length; i++) {
                
       content += '<div class="row suw-post animated fadeInUp"> '+
            '<div class="col-md-7"> '+
                '<a href="'+arr[i].url+'" target="_blank"> '+
                    '<img class="img-responsive" src="'+arr[i].imgSrc+'" alt=""> '+
                '</a> '+
            '</div> '+
            '<div class="col-md-5"> '+
                '<h2>'+arr[i].name+'</h2> '+
                '<h4>'+arr[i].date+'</h4> '+
                '<p class="post-tags '+arr[i].tags+'">'+arr[i].tags+'</p> '+
                '<a class="btn btn-primary suw-btn" href="'+arr[i].url+'" target="_blank">View Project</a>  <div style="margin-top: 25px;" class="addthis_sharing_toolbox"></div>'+
            '</div> </div>';
            
    }
    $("#suwTimeline").html(content);
};