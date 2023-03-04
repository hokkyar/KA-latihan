// dashboard
exports.dashboard = (req, res) => {
  res.render('index', { page: 'dashboard', title: 'Dashboard', sub: '' })
}

// user handler page
exports.userHandlerPage = (req, res) => {
  res.render('index', { page: 'user-handler', title: 'User', sub: 'Kelola' })
}

// course handler page
exports.courseHandlerPage = (req, res) => {
  res.render('index', { page: 'course-handler', title: 'Course', sub: 'Kelola' })
}

// event handler page
exports.eventHandlerPage = (req, res) => {
  res.render('index', { page: 'event-handler', title: 'Event', sub: 'Kelola' })
}

// qr handler page
exports.qrHandlerPage = (req, res) => {
  res.render('index', { page: 'qr-code', title: 'Scan QR Code', sub: 'QR' })
}

// profile page
exports.profile = (req, res) => {
  res.render('index', { page: 'profile', title: 'Profile', sub: 'Profile' })
}

// faq page
exports.faq = (req, res) => {
  res.render('index', { page: 'faq', title: 'FAQ', sub: 'FAQ' })
}

// contact page
exports.contact = (req, res) => {
  res.render('index', { page: 'contact', title: 'Contact', sub: 'Contact' })
}
