module.exports = (app) => {
    app.use('/brand', require('../routes/brand'));
    app.use('/industry', require('../routes/industry'));
    app.use('/category', require('../routes/category'));
    app.use('/category_type', require('../routes/category_type'));
    app.use('/sub_category', require('../routes/sub_category'));
    app.use('/child_category', require('../routes/child_category'));
    app.use('/unit_type', require('../routes/unit_type'));
    app.use('/coupon', require('../routes/coupon'));
    app.use('/admin', require('../routes/admin'));
    app.use('/customer', require('../routes/customer'));
    app.use('/user', require('../routes/user'));
    app.use('/vendor', require('../routes/vendor'));
    app.use('/product', require('../routes/product'));
    app.use('/company_details', require('../routes/company_details'));
    app.use('/country', require('../routes/country'));
    app.use('/order', require('../routes/order'));
};

