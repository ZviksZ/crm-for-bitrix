import React            from 'react';
import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Grid             from '@material-ui/core/Grid';
import Box              from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import {makeStyles}     from '@material-ui/core/styles';
import Container        from '@material-ui/core/Container';
import {useForm}        from "react-hook-form";
import {registerSchema} from "../../../../helpers/validationShemas.js";

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="https://material-ui.com/">
            Your Website
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function Register({setSignInUp}) {
   const classes = useStyles();

   const {register, handleSubmit, errors} = useForm({
      validationSchema: registerSchema
   });

   const onSubmit = data => {
      console.log(data)
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline/>
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
               Регистрация
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                        inputRef={register}
                        id="firstName"
                        label="Имя"
                        autoFocus
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.surname}
                        helperText={errors.surname ? errors.surname.message : ''}
                        inputRef={register}
                        id="lastName"
                        label="Фамилия"
                        name="surname"
                        autoComplete="lname"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                        inputRef={register}
                        label="Email"
                        name="email"
                        autoComplete="email"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                        inputRef={register}
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Зарегистрироваться
               </Button>
               <Grid container justify="flex-end">
                  <Grid item>
                     <Link href="#" variant="body2" onClick={() => setSignInUp(false)}>
                        {"Уже зарегистрированы? Нажмите, чтобы войти"}
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
         <Box mt={5}>
            <Copyright/>
         </Box>
      </Container>
   );
}

