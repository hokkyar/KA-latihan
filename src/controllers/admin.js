// dashboard
exports.dashboard = async (req, res) => {
  res.render('index', { title: 'Dashboard' })
}

// user handler page
exports.userHandlerPage = async (req, res) => {
  res.render('users', { title: 'Dashboard' })
}

// course handler page
exports.courseHandlerPage = async (req, res) => {
  res.render('courses', { title: 'Dashboard' })
}

// event handler page
exports.eventHandlerPage = async (req, res) => {
  res.render('event', { title: 'Dashboard' })
}
