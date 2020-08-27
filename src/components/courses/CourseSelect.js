import React, { Component } from "react";

import {
    Button,
    ButtonBase,
    Card,
    CardContent,
    IconButton,
    Icon,
    Modal,
    Tooltip,
    Typography,
    Grid,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import "../../css/CourseSelect.css";

// FUNC to position modal in the middle of the screen
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%"
    };
}

// CSS for modal
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 100,
        maxWidth: "90%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class CourseSelectModal extends Component {
    constructor(props) {
        super(props);
        this.difficulties = ["allDifficulties", "beginner", "intermediate", "advanced", "expert"];
        this.categories = ["geometry", "transformations", "animations", "groups", "firstTimer", "teachers", "misc"];
        this.state = {
            selectedDifficulty : "allDifficulties",
            categoryFilter : {},
        };
        for(let i in this.categories) {
            this.state.categoryFilter[this.categories[i]] = false;
        }
    }

    convertCamelCase = (text) => {
        //converts camelCase difficulty/category filters keys into Mixed Case button labels
        if (typeof(text) === "string") {
            return text.charAt(0).toUpperCase() + text.replace(/([A-Z]){1}/g, " $1").slice(1);
        }
        else {
            return text;
        }
    }  

    courseHelper = (course) => {
        let allCategoriesSelected = () => {
            let arr = course.categories;
            for(let key in this.state.categoryFilter) {
                if(this.state.categoryFilter[key] && !(arr.includes(key))) {
                    return false;
                }
            }
            return true;
        };
        let isDifficultySelected = () => {
            if(this.state.selectedDifficulty === "allDifficulties") {
                return true;
            }
            else if(this.difficulties[course.difficulty + 1] === this.state.selectedDifficulty) {
                return true;
            }
            else {
                return false;
            }
        };
        if (course && isDifficultySelected() && allCategoriesSelected()) {
            let id = course._id;
            let shortname = course.shortname;
            let name = course.name;
            let description = course.description;
            let difficulty = this.convertCamelCase(this.difficulties[course.difficulty + 1]);
            let categories = course.categories.length > 0 ? course.categories.map(this.convertCamelCase).join(", ") : "None";
            let link = "/course/" + shortname;
            return (
                <div key={id} id={id} title={name}
                    className="course-listing col-xs-12 col-md-6">
                    <a
                        tabIndex="0"
                        rel="noopener noreferrer"
                        role="button"
                        href={link}>
                        <Card>
                            <CardContent>
                                <h4>{name}</h4>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Difficulty : {difficulty}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Categories : {categories}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                    <br></br>
                </div >
            );
        } else {
            return null;
        }
    }

    setFilterValue = (type, val, key) => {
        if (type === "difficulty") {
            let newState = this.state;
            newState.selectedDifficulty = val;
            this.setState(newState);
        }
        else if (type === "category") {
            let newState = this.state;
            newState.categoryFilter[key] = val;
            this.setState(newState);
        }
    }

    resetCategories = () => {
        for(let i in this.categories) {
            this.setFilterValue("category", false , this.categories[i]);
        }
    }

    categoryHelper = (key) => {
        if (key) {
            let buttonText = this.convertCamelCase(key);
            let filter = this.state.categoryFilter;
            return(
                <Button
                    variant={filter[key] ? "contained" : "outlined"}
                    onClick={() => { this.setFilterValue("category", !filter[key], key); }}
                    size="small">
                    {buttonText}
                </Button>
            );
        }
        else {
            return null;
        }
    }

    updateDifficulty = event => {
        this.setFilterValue("difficulty", event.target.value);
    }
    
    difficultyHelper = (key) => {
        if(key) {
            let labelText = this.convertCamelCase(key);
            return (
                <FormControlLabel
                    value={key}
                    control={<Radio></Radio>}
                    checked={this.state.selectedDifficulty === key}
                    label={labelText}>
                </FormControlLabel>
            );
        }
    }

    // Render all of the elements
    render() {
        const { classes } = this.props;
        const courses = [].concat(this.props.courses);
        return (
            <div>
                {
                    !this.props.hideTooltip ?
                        <Tooltip title="Courses">
                            <IconButton
                                onClick={this.props.handleCoursesToggle}
                                id="select-course"
                                className="header-btn d-none d-md-block"
                                style={{
                                    color: "#fff",
                                    margin: 2,
                                    padding: 0,
                                }}>
                                <Icon className="material-icons">school</Icon>
                            </IconButton >
                        </Tooltip>
                        : null
                }
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.coursesOpen}
                    onClose={this.props.handleCoursesToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.props.handleCoursesToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <h3 className="col-12 p-0 mb-3 border-bottom">Available Courses</h3>
                        <div id="filters" className="border-bottom">
                            <h5>Difficulties: </h5>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="allDifficulties" value={this.state.selectedDifficulty} onChange={this.updateDifficulty} row>
                                    {
                                        this.difficulties.map(i => { return this.difficultyHelper(i); })
                                    }   
                                </RadioGroup>
                            </FormControl>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    <h5>Categories: </h5>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        onClick={() => { this.resetCategories(); }}
                                        size="small">
                                        Reset Filters
                                    </Button>
                                </Grid>
                            </Grid>
                            <div>
                                {
                                    this.categories.map(i => { return this.categoryHelper(i); })
                                }
                            </div>
                            <br></br>
                        </div>
                        <br></br>
                        <div className="row" id="courses">
                            { // Sort the users projects in alphabetical order 
                                courses.length !== 0 ?
                                    courses.sort(function (a, b) {
                                        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                                    }).map(course => {
                                        return this.courseHelper(course);
                                    })
                                    : 
                                    <Typography variant="caption" display="block" gutterBottom>No Courses Found</Typography>
                            }
                        </div>
                    </div>
                </Modal >
            </div >
        );
    }
}

const CourseSelect = withStyles(modelStyles)(CourseSelectModal);

export default CourseSelect;

