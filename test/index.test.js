const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require("../app")
const tokenmidware = require("../middleware/tokenmidware")

chai.use(chaiHttp)

// describe("api movesni testdan o'tkazish" , ()=>{
//     it("get orqali api moviesni ko'rish", (done)=>{
//         chai.request(server)
//         .get("/api/movies")
//         .end((err , res)=>{
//             res.should.have.status(200)
//             done()
//         })
//     })
// })

// describe("autentificate qismini testdan o'tqazish" , ()=>{
//     before((done) => {
//         chai.request(server)
//         .post("/user/aut")
//         .send({username: "Bekmurod" , password: "12345"})
//         .end((err , res)=>{
//             token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJla211cm9kIiwiaWF0IjoxNjQ1NzA4NTEyfQ.p0Rat_ptoB7qbmn8fe7vSAnNHGXevHOfnM9M0XlE0Fg"
//             console.log(token);
//             done()
//         })
//     });

//     describe("/api moviesga kirish" , ()=>{
//         it('get metodi yordamida', (done) => {
//             chai.request(server)
//             .get("/api/movies")
//             .set("x-access-token" , token)
//             .end((err , res)=>{
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 done()
//             })
//         })
//     })
// })


describe("autentificate qismini testdan o'tqazish" , ()=>{
    before((done) => {
        chai.request(server)
        .post("/user/aut")
        .send({username: "Bekmurod" , password: "12345"})
        .end((err , res)=>{
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJla211cm9kIiwiaWF0IjoxNjQ1NzA4NTEyfQ.p0Rat_ptoB7qbmn8fe7vSAnNHGXevHOfnM9M0XlE0Fg"
            console.log(token);
            done()
        })
    });

    describe("/api moviesga kirish" , ()=>{
        it('get metodi yordamida', (done) => {
            chai.request(server)
            .get("/api/movies")
            .set("x-access-token" , token)
            .end((err , res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        });
    })

    describe("kino qo'shishni testlash" , ()=>{
        it("kino qo'shish" , ()=>{
            const movies = {
                title: "Kino", 
                country: "USA",
                year: "1547"
            }

            chai.request(server)
            .post("/api/directors")
            .set("x-access-token" , token)
            .send(movies)
            .end((err , res)=>{
                res.should.have.status(200)
                res.should.be.a("object")
                res.should.have.property(title)
                res.should.have.property(country)
                res.should.have.property(year)
            })
            
    })
})
})

