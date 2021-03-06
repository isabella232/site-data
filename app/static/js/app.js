var issues  = $('.blog-issue')
var holding = $('.on-hold')
issues.each(function(index, issue) {
  var created = new Date(issue.dataset.created),
      updated = new Date(issue.dataset.updated),
      labels = issue.dataset.labels.split(','),
      now = Date.now(),
      createdDiff = now - created,
      updatedDiff = now - updated,
      c_string = created.toDateString(),
      u_string = updated.toDateString(),
      createdDays = Math.round(createdDiff/1000/60/60/24),
      updatedDays = Math.round(updatedDiff/1000/60/60/24),
      list = "<li>Created at " + c_string + ". "+ createdDays + " days ago.</li><li>Last updated " + u_string + ". " + updatedDays + " days ago.</li>"
  if ( issue.dataset.approve.length > 0 ) {
    var dates = issue.dataset.approve.trim().split(' '),
        approve = new Date(dates[0]),
        approveDiff = now - approve,
        a_string = approve.toDateString(),
        approveDays = Math.round(approveDiff/1000/60/60/24)
    list += "<li>Sent for approval "+approveDays +" days ago.</li>"
  }
  $(list).appendTo($(issue.children[2]));
  if ( approveDays ) {
    timeSort($(issue), approveDays);
  }
})
holding.each(function(index, section) {
  var count = section.childElementCount-3
  if (count == 0) {
    $(section.children[1].text("No posts in this category!"))
  } else if (count > 0) {
    $(section.children[1]).text(count + " posts in this category.")
  }
})
function timeSort(issue, days) {
  if (days > 42 ) {
    $(issue[0]).appendTo($(".oldest-posts"))
  } else if ( days > 21 && days < 42 ) {
    $(issue[0]).appendTo($(".older-posts"))
  } else if (days > 7 && days <= 21) {
    $(issue[0]).appendTo($(".newer-posts"))
  } else {
    $(issue[0]).appendTo($(".newest-posts"))
  }
}
