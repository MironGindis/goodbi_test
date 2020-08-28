import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import * as axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBackground: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    cardPage: {
        maxWidth: 500
    },

    formPage: {
        margin: theme.spacing(1),
    },

    formInput:{
        width: '100%'
    }
}));

let App = () => {

    let [inputValue, setInputValue] = useState('');

    let [gender, setGender] = useState(null);

    let onBtnClick = () => {
        if (inputValue){
        axios.get(`https://api.genderize.io?name=${inputValue}`).then(response =>{
            if (response.data.gender ==='male' || response.data.gender ==='female') {
                setGender(response.data.gender);
            } else {
                alert(`Не удалось найти информацию о имени ${inputValue}`)
            }

        })}
    }
    const classes = useStyles();

    return (
        <div className={classes.appBackground}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Узнай пол по имени
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.drawerHeader}/>
                <Container>
                    <Card className={classes.cardPage}>
                        <form className={classes.formPage} noValidate autoComplete="off">
                            <CardContent>
                                <TextField className={classes.formInput} onChange={(e)=>{setInputValue(e.currentTarget.value)}} id="filled-basic" label="Введи свое транслитерированое имя (Латиницей)" variant="filled" value={inputValue}/>
                            </CardContent>
                            <CardActions>
                                <Button onClick={onBtnClick} variant="contained" color="primary">
                                    Узнать пол
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Container>
                <div className={classes.drawerHeader}/>
                <Container className={classes.root}>
                    { (gender==='male') ?
                         <Card className={classes.cardPage}>
                         <CardContent>
                             <CardHeader title="Мужчина"/>
                         </CardContent>
                     </Card> : null
                    }
                    { (gender==='female') ?
                         <Card className={classes.cardPage}>
                         <CardContent>
                             <CardHeader title="Женщина"/>
                         </CardContent>
                     </Card> : null
                    }
                </Container>

            </main>
        </div>
    );
}

export default App;
