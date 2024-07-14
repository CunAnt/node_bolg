const { renderSync } = require("sass");
const Course = require("../models/Course");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
class CourseControllers {
  //[GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }
  //[GET] /courses/create
  create(req, res) {
    res.render("courses/create");
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    console.log(req.body);
    formData.image = `https://img.youtube.com/vi/${req.body.videos}/hqdefault.jpg`;
    const couses = new Course(req.body);
    couses.save().then(() => res.redirect("/"));
  }

  //[GET] /courese/getUpdate
  getUpdate(req, res, next) {
    Course.find({}).then((courses) => {
      res.render("courses/update", {
        courses: mutipleMongooseToObject(courses),
      });
    });
  }
  //[GET] /courses/update/:slug
  detailUpdate(req, res, next) {
    Course.findOne({ slug: req.params.slug }).then((course) => {
      res.render("courses/detailUpdate", {
        course: mongooseToObject(course),
      });
    });
  }

  //[POST] /courses/postUpdate
  postUpdate(req, res, next) {
    const courseId = req.body.courseID;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      videos: req.body.videos,
      image: req.body.image,
      slug: req.body.slug,
    };

    Course.findByIdAndUpdate(courseId, updateData, { new: true })
      .then((updatedCourse) => {
        if (!updatedCourse) {
          return res
            .status(404)
            .json({ error: "Không tìm thấy khóa học cần cập nhật." });
        }

        // req.flash("success_msg", "Cập nhật khóa học thành công.");
        res.redirect("back");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật khóa học:", err); // Log lỗi chi tiết ra console
        res.status(500).json({
          error: "Đã xảy ra lỗi khi cập nhật khóa học.",
          err: `${err}`,
        }); // Trả về thông báo lỗi chi tiết cho client
      });
  }
  //[POST] /courses/delete/:slug
  delete(req, res, next) {
    Course.findByIdAndDelete(req.params.id)
      .then((deleteCourse) => {
        if (!deleteCourse) {
          req.flash("error", "KHÔNG TÌM THẤY ID CẦN XÓA");
          return res.status(404).json({
            status_code: "404",
            error: "KHÔNG TÌM THẤY MỤC CẦN XÓA",
          });
        }
        req.flash("success", "ĐÃ XÓA THÀNH CÔNG");
        res.redirect("back");
      })
      .catch((err) => {
        req.flash("error", "LỖI HỆ THỐNG XIN VUI LÒNG THỬ LẠI SAU");
        res.status(500).json({ error: "LỖI HỆ THỐNG XIN VUI LÒNG THỬ LẠI" });
      });
  }
}

module.exports = new CourseControllers();
