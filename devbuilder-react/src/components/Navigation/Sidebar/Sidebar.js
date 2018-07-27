import React, { Fragment } from 'react';
import classes from './Sidebar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavItems from '../NavItems/NavItems';

const sidebar = (props) => {
   let attachedClasses = [classes.Sidebar, classes.Close];
   if(props.isOpen) {
      attachedClasses = [classes.Sidebar, classes.Open];
   }

   return (
      <Fragment>
         <Backdrop show={props.isOpen}  clicked={props.closed}/>
         <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <NavItems isAuthenticated={props.isAuthenticated} />
         </div>
      </Fragment>
   );
};

export default sidebar;