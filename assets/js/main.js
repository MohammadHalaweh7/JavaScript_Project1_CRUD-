// Mohammad Halaweh 0598939763
var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var addCourceClick = document.getElementById("addCourceClick");
var data =document.getElementById("data");

var coursesArray ;

var currentIndex;

var nameAlert = document.getElementById("nameAlert");

var ClearCourseButton = document.getElementById("ClearCourseButton");


if(localStorage.getItem("coursesList")==null)
{
    coursesArray = [];
}else{
    coursesArray = JSON.parse(localStorage.getItem("coursesList"));
    displayData();

}


addCourceClick.onclick = function()
{
    if(addCourceClick.innerHTML=="Add Course")
    {
        addCourse();
        courseName.classList.remove("is-valid");
    }
    else{
        updateCourse();
        document.getElementById("addCourceClick").innerHTML="Add Course";
    }
    displayData();
    clear();

}

    // Creat-----------------------------------------------------------
function addCourse()
{
    var courseObject = {
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
    };
    coursesArray.push(courseObject);
    localStorage.setItem("coursesList",JSON.stringify(coursesArray));
    // courseName.classList.remove("is-valid");

    // sweet alert
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
      })

}


    // Read-----------------------------------------------------------
function displayData()
{
    var result="";

    for(var i=0;i<coursesArray.length;i++)
    {
        result+= 
        `
<tr>
        <td>${i}</td>
        <td>${coursesArray[i].name}</td>
        <td>${coursesArray[i].category}</td>
        <td>${coursesArray[i].price}</td>
        <td>${coursesArray[i].description}</td>
        <td>
        <button   onclick="getCourseData(${i})"    class="btn btn-outline-info">Update</button>
        <button     onclick="deleteCourse(${i})"  class="btn btn-outline-danger">Delete</button>
        </td>
        
        </tr>
        `
    }
    data.innerHTML = result;
}



    // to clear data from text after add course into table
    // clear
function clear()
{
    courseName.value=" ";
    courseCategory.value=" ";
    coursePrice.value=" ";
    courseDescription.value=" ";
}
// test
ClearCourseButton.onclick=function()
{
    courseName.value=" ";
    courseCategory.value=" ";
    coursePrice.value=" ";
    courseDescription.value=" ";
}

// deleteCourse----------------------------------------------------------
function deleteCourse(index)
{
    // sweet alert
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed)
         {
            
    coursesArray.splice(index,1);
    localStorage.setItem("coursesList",JSON.stringify(coursesArray));
    displayData();

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })







}


// deleteAllButton----------------------------------------------------------

deleteAllButton.onclick=function()
{
    localStorage.removeItem("coursesList");
    coursesArray=[];
    data.innerHTML="";

            // sweet alert
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'All courses deleted successfully',
                showConfirmButton: false,
                timer: 1500
              })

}
// search----------------------------------------------------------
function search(e)
{
    var result="";

    for(var i=0;i<coursesArray.length;i++)
    {
        if(coursesArray[i].name.toLowerCase().includes(e.value.toLowerCase()))
        {
            result+= 
            `
    <tr>
            <td>${i}</td>
            <td>${coursesArray[i].name}</td>
            <td>${coursesArray[i].category}</td>
            <td>${coursesArray[i].price}</td>
            <td>${coursesArray[i].description}</td>
            <td>
            <button  onclick="getCourseData(${i})"   class="btn btn-outline-info">Update</button>
            <button     onclick="deleteCourse(${i})"  class="btn btn-outline-danger">Delete</button>
            </td>
            
            </tr>
            `
        }
        data.innerHTML = result;
        }


}
// getCourseData

function getCourseData(index)
{
    var course=coursesArray[index];
 
    courseName.value=course.name;
    courseCategory.value=course.category;
    coursePrice.value=course.price;
    courseDescription.value=course.description;

    document.getElementById("addCourceClick").innerHTML="Update course";
    currentIndex=index;
}






// updateCourse------------------------------------------------------------
function updateCourse ()
{
    var courseObject = {
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
    };
    coursesArray[currentIndex].name=courseObject.name;
    coursesArray[currentIndex].category=courseObject.category;
    coursesArray[currentIndex].price=courseObject.price;
    coursesArray[currentIndex].description=courseObject.description;
    localStorage.setItem("coursesList",JSON.stringify(coursesArray));

        // sweet alert
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Course updated successfully',
            showConfirmButton: false,
            timer: 1500
          })


}
// Real time validation
//Nmae validation--------------------------------------------
courseName.onkeyup=function()
{
    var namePattern = /^[A-Z][a-z]{2,10}$/;
    if(namePattern.test(courseName.value))
    {
        addCourceClick.removeAttribute("disabled");
        courseName.classList.add("is-valid");
        courseName.classList.remove("is-invalid");
        // add in style.css to make nameAlert is disaple:none
        nameAlert.classList.add("d-none");
        
    }
    else
    {
        addCourceClick.setAttribute("disabled","disabled");
        courseName.classList.replace("is-valid","is-invalid");
        nameAlert.classList.add("d-block");
        nameAlert.classList.remove("d-none");
    }
}
