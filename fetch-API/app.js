

var courseAPI='http://localhost:3000/courses';

function start(){
    getCourses(renderCourses);

    handleCreateForm()
}

start();

// Functions

function getCourses(callback){
    fetch(courseAPI)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function createCourse(data){
    var options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then (function (response){
            response.json();
        })
        .then (callback);
       
}

function updateCourse(data,id, callback) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(courseApi + "/" + id, options)
      .then(function (response) {
        response.json();
      })
      .then(callback);
  }

function handleDeleteCourse(id){
    var options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(courseAPI+'/'+id, options)
        .then (function (response){
            response.json();
        })
        .then (function(){
            getCourses(renderCourses);
        });
}

function handleUpdateCourse(id) {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
  
    var formData = {
      name: name,
      description: description,
    };
  
    updateCourse(formData, id, function () {
      getCourses(renderCourses);
    });
  }


function renderCourses(courses){
    var listCourseBlock=document.querySelector('#list-courses');
    var htmls=courses.map(function(courses){
        return `
            <li>
                <h4> ${courses.name}</h4>
                <p>${courses.description}</p>
                <button onclick="handleDeleteCourse(${courses.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${courses.id})">Sửa</button>
            </li>
        `;
    });
    listCourseBlock.innerHTML=htmls.join('');
}

function handleCreateForm(){
    var createBtn=document.querySelector('#create');
    createBtn.onclick=function(){
        var name=document.querySelector('input[name="name"]').value;
        var desc=document.querySelector('input[name="description"]').value;

        var formData={
            name: name,
            description: desc
        }
        createCourse(formData, function(){
            getCourses(renderCourses);
        }); 
    }
};