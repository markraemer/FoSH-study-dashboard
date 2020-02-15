/*!
FoSh project implementation by Martin Kraemer
*/

$(document).ready(() => {


  //let url = location.href.replace(/(?<=#\S+)\/$/, "");
  let url = location.href.replace(/^(.+\#\S+)\/$/, "$1");



  if (location.hash) {
    const hash = url.split("#");
    console.log(hash);
    $('#myTab a[href="#' + hash[1] + '"]').tab("show");
    //url = location.href.replace(/\/#/, "#");
    console.log(url);
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  }

  $('a[data-toggle="tab"]').on("click", function() {
    let newUrl;
    const hash = $(this).attr("href");
    console.log(hash);
    if (hash == "#home") {
      newUrl = url.split("#")[0];
    } else {
      newUrl = url.split("#")[0] + hash;
    }
    newUrl += "/";
    history.replaceState(null, null, newUrl);
  });

  $("#information").load("information.html", function(responseTxt, statusTxt, xhr) {

  });

  $("#notes").load("notes.html", function(responseTxt, statusTxt, xhr) {
    $(".pop").each(function(index) {
      console.log('attaching function');
      $(this).on("click", function() {
        console.log('clicked image');
        $('#imagepreview').attr('src', $(this).children('img').attr('src')); // here asign the image to the modal when the user click the enlarge link
        $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
      });
    });
  });


  $("#progression").load("progression.html", function(responseTxt, statusTxt, xhr) {
    // date functions
    var startdate = $('#startdate').html();
    $('#today').html(moment().format("DD/MM/YYYY"));
    var current_week = moment().diff(moment(startdate, "DD/MM/YYYY"),"weeks");
    $('#week-now').html(current_week);


    var mom = moment(startdate, "DD/MM/YYYY").add(24, 'weeks');
    $('#enddate').html(mom.endOf('week').format("DD/MM/YYYY"));
    var fset = false;
    $('[id=visit-week]').each(function(index) {
      var week = $(this).html();
      console.log(week + ' ' + current_week + ' ' + $(this).parent().next().children('#visit-week').length);
      if (week == current_week ) {
        $(this).parent().addClass("success");
        $(this).prev().html("<i>current</i>");
        fset = true;
      } else if (week > current_week && (current_week < $(this).parent().next().children('#visit-week').html() || $(this).parent().next().children('#visit-week').length == 0 ) && !fset == true) {
        $(this).parent().before("</tr><tr class='success narrow_row'> <td ></td>   <td style='text-align:right;font-style:italic; '>current</td>      <td>" + current_week +
          "</td>        <td></td>          <td></td>            ");
        fset = true;
      } else if (week < current_week && $(this).parent().next().children('#visit-week').length == 0 && !fset == true) {
        $(this).parent().after("</tr><tr class='info narrow_row'> <td ></td>   <td style='text-align:right;font-style:italic; '>FINISHED</td>      <td>" + current_week +
          "</td>        <td></td>          <td></td>            ");
      }

      if (!$(this).attr('notouch')) {
        var mom = moment(startdate, "DD/MM/YYYY").add(week, 'weeks');

        $(this).next().html(mom.startOf('week').format("DD/MM/YYYY") + " - " + mom.endOf('week').format("DD/MM/YYYY"));
      }
    });


  });

});
moment().format('MMMM Do YYYY, h:mm:ss a');
