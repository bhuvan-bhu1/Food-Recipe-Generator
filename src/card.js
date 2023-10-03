// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import {Getmodal} from './modal'; 
import save from './save.png'
function Cardcomponent(props) {
  document.addEventListener('click',(e) =>
  {
    // Get element class(es)
    let elementid = e.target.id;
    // If element has class(es)
    if (elementid !== '') {
      console.log(e.target.id);
    }
  }
  );

  return (
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src={props.item.recipe.image} />
    //   <Card.Body>
    //     <Card.Title>Card Title</Card.Title>
    //     <Card.Text>
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </Card.Text>
    //     <Button variant="primary">Go somewhere</Button>
    //   </Card.Body>
    // </Card>
    <div className='hover'>
            {/* <div className='dishtype'>{element.recipe.dishType[0]}</div> */}
            <div className='comp-body' key={props.index}>
              <img src={props.element.recipe.image} alt='food' className='comp-img'/> 
              <div className='comp-down'>
                <p className='comp-name'>{props.element.recipe.label}</p>
                <Getmodal label={props.element.recipe.label} ingrediants = {props.element.recipe.ingredients} link= {props.element.recipe.url}/>
              <button className='save-option' id={props.index}>
                
              <img src= {save} alt='Save' className='save'/> 
              </button>             
              </div>
            </div>  
          </div>
  );
}

export {Cardcomponent};