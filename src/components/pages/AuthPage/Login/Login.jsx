import cn               from "classnames";
import React            from 'react';
import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import { makeStyles }   from '@material-ui/core/styles';
import Container        from '@material-ui/core/Container';
import {useForm}        from "react-hook-form";
import {useDispatch}    from "react-redux";
import {loginSchema}    from "../../../../helpers/validationShemas.js";
import {login}          from "../../../../redux/authReducer.js";
import styles           from "../../../common/Navbar/Navbar.module.scss";

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(16),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#65C14B',
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(2, 0, 2)
   },
}));

export default function Login({}) {
   const classes = useStyles();
   const dispatch = useDispatch()

   const {register, handleSubmit, errors} = useForm({
      validationSchema: loginSchema
   });

   const onSubmit = data => {
      dispatch(login(data.login, data.password))
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Авторизация
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  error={!!errors.login}
                  helperText={errors.login ? errors.login.message : ''}
                  inputRef={register}
                  name="login"
                  autoComplete="email"
                  autoFocus
                  className="form-input"
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  inputRef={register}
                  label="Пароль"
                  type="password"
                  id="password"
                  className="form-input"
                  autoComplete="current-password"
               />
               <Button
                  type="submit"
                  className="btn btn-green"
                  fullWidth
                  variant="contained"
                  className={cn(classes.submit, 'btn', 'btn-green', 'btn-lg')}
               >
                  Войти
               </Button>
            </form>
         </div>
      </Container>
   );
}
