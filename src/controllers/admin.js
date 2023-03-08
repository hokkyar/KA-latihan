// login page
exports.loginPages = (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/dashboard')
  } else {
    res.render('pages/login')
  }
}

// login handler
exports.loginHandler = (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    req.session.user = {
      username: req.body.username
    }
    res.redirect('/admin/dashboard')
  } else {
    res.redirect('/admin/login')
  }
}

// logout handler
exports.logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(204)
    res.redirect('/admin/login')
  })
}

// dashboard page
exports.dashboard = (req, res) => {
  res.render('index', { page: 'dashboard', title: 'Dashboard', sub: '', detail: '' })
}

// user handler page
exports.userHandlerPage = (req, res) => {
  res.render('index', { page: 'user-handler', title: 'User', sub: 'Kelola', detail: '' })
}

// show user handler page
exports.showUserPage = (req, res) => {
  res.render('index', { page: 'show-user', title: 'User', sub: 'Kelola', detail: { id: req.params.id } })
}

// course handler page
exports.courseHandlerPage = (req, res) => {
  res.render('index', { page: 'course-handler', title: 'Course', sub: 'Kelola', detail: '' })
}

// event handler page
exports.eventHandlerPage = (req, res) => {
  res.render('index', { page: 'event-handler', title: 'Event', sub: 'Kelola', detail: '' })
}

// qr handler page
exports.qrHandlerPage = (req, res) => {
  res.render('index', { page: 'qr-code', title: 'Scan QR Code', sub: 'QR', detail: '' })
}

// profile page
exports.profile = (req, res) => {
  res.render('index', { page: 'profile', title: 'Profile', sub: 'Profile', detail: '' })
}

// faq page
exports.faq = (req, res) => {
  res.render('index', { page: 'faq', title: 'FAQ', sub: 'FAQ', detail: '' })
}

// contact page
exports.contact = (req, res) => {
  res.render('index', { page: 'contact', title: 'Contact', sub: 'Contact', detail: '' })
}
