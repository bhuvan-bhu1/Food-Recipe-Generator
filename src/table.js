import Table from 'react-bootstrap/Table';

const Tablecomp = (props) =>{
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Weight(gm)</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((ele)=>{
            return(
                <tr>
                    <td>{ele.text}</td>
                    <td>{ele.weight}</td>
                </tr>
            )
        })}
        <tr>
          <td><strong>Total Weight</strong></td>
          <td>{props.weight}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export {Tablecomp};