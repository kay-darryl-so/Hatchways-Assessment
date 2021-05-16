import React, {Component} from 'react'
import './App.css';
import Students from './Components/Students';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      studentData:[],
      searchName:'',
      searchTag:''
    }

  }

  componentDidMount(){
    fetch('https://hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => {
        data.students.map(student=>{
          return student.tags=''
        })
        this.setState({
          studentData:data.students
        })
      })
  }
  
  handleNameChange=(event)=>{
    let value = event.target.value.toLowerCase();
    this.setState({
      searchName: value
    })
  }

  handleTagChange=(event)=>{
    let value = event.target.value.toLowerCase();
    this.setState({
      searchTag: value
    })
  }

  updateStudentTags=(id, tag)=>{
    let studentObject = this.state.studentData
    studentObject.find(student=>{
      if (student.id === id){
        student.tags=tag
        console.log(student.tags)
      }
    })
    this.setState({
      studentData: studentObject
    })
    
  }
  
  
  render(){
    console.log('studentData', this.state.studentData)
    let result=this.state.studentData.filter(student=>{
      return(
        student.firstName.toLowerCase().includes(this.state.searchName) || student.lastName.toLowerCase().includes(this.state.searchName)
      )
    })
    if (this.state.searchTag!==''){
      result=result.filter(student=>{
        if (student.tags){
          return student.tags.some(tag=> tag.includes(this.state.searchTag))
        }
      })
    }
    return (
      <div>
        <form>
          <input id='name-input' type='text' placeholder='Search by name' onChange={this.handleNameChange}></input>
          <input id='tag-input' type='text' placeholder='Search by tags' onChange={this.handleTagChange}></input>
        </form>
        {result.map((student, i) =>{
          return(
            <Students
            key={i}
            pic={student.pic} 
            firstName={student.firstName} 
            lastName={student.lastName} 
            email={student.email} 
            company={student.company} 
            skill={student.skill} 
            grades={student.grades} 
            id={student.id}
            tags={student.tags}
            updateTags={this.updateStudentTags.bind(this.student)}
            />
          )
        })}
      </div>
    );
  }
  

}

