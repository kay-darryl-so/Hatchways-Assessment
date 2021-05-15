import React, {Component} from 'react'
import './Student.css'

export default class Students extends Component{
    constructor(props){
        super(props);
        this.state={
            showGrades: false,
            tags:[],
            newTag:''
        }
    }

    getAverage = (grades)=>{
        let result=0
        let i
        for (i=0;i<grades.length;i++){
            grades[i]=parseInt(grades[i]);
            result+=grades[i];
        }
        result/=grades.length
        return result;
    }

    handleShowGrades = ()=>{
        this.setState({
            showGrades: !this.state.showGrades
        })
    }

    handleChangeTag=(event)=> {
        this.setState({
            newTag:event.target.value.toLowerCase()
        })

    }
    handleAddTag=(event)=>{
        if (event.code==="Enter"){
            event.preventDefault()
            if (!this.state.tags.includes(this.state.newTag)&&this.state.newTag!==''){
                this.setState({
                    tags: this.state.tags.concat(this.state.newTag),
                    newTag:''
                }, ()=>{
                    this.props.updateTags(this.props.id, this.state.tags)
                })
                
            }  
            event.target.value=''
        }
        
    }

    render(){
        return(
            <div className='student'>
                {this.state.showGrades ?
                    <button className="expand-btn" onClick={this.handleShowGrades}>-</button>
                    : <button className="expand-btn" onClick={this.handleShowGrades}>+</button>
                }
                <img src={this.props.pic} alt="student avatar"></img>
                <p className='studentName'>{this.props.firstName.toUpperCase()}{" "}{this.props.lastName.toUpperCase()}</p>
                <p>Email: {this.props.email}</p>
                <p>Company: {this.props.company}</p>
                <p>Skills: {this.props.skill}</p>
                <p>Average: {this.getAverage(this.props.grades)}%</p>
                
                {this.state.showGrades ?
                    <div>
                        {this.props.grades.map((score, index)=>{
                        return <p key={index}>Test {index+1}: {score}%</p>
                    })}
                        {this.state.tags.length > 0 ?
                            <ul>
                                {this.state.tags.map(tag=>{
                                    return <li>{tag}</li>
                                })}
                            </ul>
                            : null
                        }
                        <form onSubmit={e=>e.preventDefault()}>
                            <input className='add-tag-input' type='text' placeholder='add a tag' 
                            onChange={this.handleChangeTag} 
                            onKeyPress={this.handleAddTag}
                            ></input>
                        </form>
                    </div>
                    : null
                }
            </div>
        )
    }

}

