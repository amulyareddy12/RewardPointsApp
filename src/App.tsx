import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Form, Button, Container, Row, Col, Dropdown, Table, Card, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PRODUCTS, TRANSACTIONS } from './data';
const App:React.FC = () => {
const totalProducts =  PRODUCTS;  
const [transactions, setTransactions] = useState<any[]>(TRANSACTIONS);
const [indTransactions, setIndTransactions] = useState<any[]>([]);
const [products, setProducts] = useState(totalProducts);
const [dropDownVal, setDropDownVal] = useState("Select Product");
const [price, setPrice] = useState('');
const [email, setEmail] = useState('');
const [totalRewardPoints, setTotalRewardPoints] = useState(0);


const productSelected = (val:any) => {
  setDropDownVal(val);
  const product = totalProducts.find(product=>product.item===val);
  setPrice(`${product?.price}$`)
}
const handleChange = (event:any) => {
  setEmail(event.target.value)
}


const buyProduct = () => {
  if(!email || email.indexOf('@') ===-1){
    alert('Please Enter Valid Email!')
  } else if(dropDownVal === 'Select Product') {
    alert('Select Any Product!')
  } else {
    const priceFormatted = parseInt(price.replace('$', ''))
    let rewardPoints = 0
    if(priceFormatted <= 50) {
      rewardPoints = priceFormatted
    } else if(priceFormatted > 50 && priceFormatted <= 100) {
      rewardPoints = (priceFormatted-50)*1
    } else if(priceFormatted > 100) {
      rewardPoints = 50
      rewardPoints+=(priceFormatted-100)*2
    }
    const product = {email: email, product: dropDownVal, price : price, rewardPoints : rewardPoints}
    const trans = []
    let totalRewardPts = rewardPoints
    trans.push(product)
    transactions.forEach(val => {
      if(email === val.email) {
        totalRewardPts+=val.rewardPoints
        trans.push(val)
      }
    })
    setTotalRewardPoints(totalRewardPts)
    setIndTransactions(trans)
    transactions.push(product)
    setTransactions(transactions)
  }
 
}
  return (
    <div className="App">
      <Container>
        <Row><h2 style={{margin: 'auto', color : '#007bff'}}>Portals Platform </h2></Row>
        <br></br>
        <Row>
      <Col md={3}></Col>
        <Col md={6}>

  <Form>
  Make a transaction here and see your reward points
  <Form.Group controlId="formBasicProducts">
    <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    {dropDownVal}
  </Dropdown.Toggle>

  <Dropdown.Menu>
   {products.map((product:any) => {
    return <Dropdown.Item onClick={()=>productSelected(product.item)}>{product.item}</Dropdown.Item>
   })}
  </Dropdown.Menu>
</Dropdown>
    
  </Form.Group>


  <Form.Group controlId="formBasicEmail">
    <Form.Control type="email" onChange={handleChange} placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Control type="text" defaultValue={price} disabled={true} placeholder="Price ($)" />
  </Form.Group>
  <Button variant="primary" type="button"  onClick={buyProduct}>
    Buy
  </Button>
 
</Form>

</Col>
<Col md={3}></Col>
</Row>
<br></br>
  Total RewardPoints : <h3 style={{ color : '#007bff'}}>{totalRewardPoints}</h3> Your Transactions since past 3 months!
<Row>
      <Col md={3}></Col>
        <Col md={6}>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Email</th>
      <th>Product</th>
      <th>Price</th>
      <th>Reward Points</th>
    </tr>
  </thead>
  <tbody>
  {indTransactions.length > 0 && indTransactions.map((trans:any, index:number) => {
    return (<tr>
    <td>{index+1}</td>
    <td>{trans.email}</td>
    <td>{trans.product}</td>
    <td>{trans.price}</td>
    <td>{trans.rewardPoints}</td>
  </tr>)
   })}
  
    
  </tbody>
</Table>
          
        </Col>
        <Col md={3}></Col>
        </Row>

        <br></br>
        <Row>
      <Col md={3}></Col>
        <Col md={6}>
        <Accordion >
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click to See All Transactions!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Email</th>
      <th>Product</th>
      <th>Price</th>
      <th>Reward Points</th>
    </tr>
  </thead>
  <tbody>
  {transactions.length > 0 && transactions.map((trans:any, index:number) => {
    return (<tr>
    <td>{index+1}</td>
    <td>{trans.email}</td>
    <td>{trans.product}</td>
    <td>{trans.price}</td>
    <td>{trans.rewardPoints}</td>
  </tr>)
   })}
    
    
  </tbody>
</Table></Card.Body>
    </Accordion.Collapse>
  </Card>
 
</Accordion>

</Col>
        <Col md={3}></Col>
        </Row>
</Container>
    </div>
  );
}

export default App;
