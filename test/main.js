var model = {
    account : {
    username: "nadirlaskar",
    password: "mypass",
    profile:{
      desc: "this a desc",
      loggedIn : true,
      gender: "female",
      image: "/image.png",
      file: "resume.pdf",
      status: "approved",
      info: "some info",
      logout:"/logout"
    }
},

products: ["p1","p2","p3"]
}

window.b = new Binder({model:model});
b.parseControls();
b.update();