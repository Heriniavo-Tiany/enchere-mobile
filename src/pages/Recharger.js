import React, {useState} from "react";

import {Button, Col, Container, FormGroup, Input, Row} from "reactstrap";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config";

function Recharger() {

    const history = useHistory();

    React.useEffect(() => {
        document.body.classList.toggle("index-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            document.body.classList.toggle("index-page");
        };
    }, []);


    const [compte, setCompte] = useState("");

    const recharger = async () => {
        const params = {
            compte: compte,
            idutilisateur: sessionStorage.getItem("id")
        };

        try {
            const response = await axios.post(`${API_URL}/insertrechargements`, {}, {params});
            if (response.status === 200) {
                console.log(response.data);
                history.push(`/profil`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="page-header header-filter">
            <div className="squares square1"/>
            <div className="squares square2"/>
            <div className="squares square3"/>
            <div className="squares square4"/>
            <div className="squares square5"/>
            <div className="squares square6"/>
            <div className="squares square7"/>
            <Container>
                <div className="content-center brand">
                    <h3 className="h3-seo">Veuillez insérer le montant en Ar</h3>

                    <Row>
                        <Col lg="12" sm="12">
                            <FormGroup>
                                <Input defaultValue="" type="number"
                                       min={3} max={18}
                                       onChange={(e) => setCompte(e.target.value)}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button
                        className="btn-round" color="primary" type="button"
                        onClick={() => recharger()}
                        disabled={compte.length === 0}
                    >
                        Valider
                    </Button>

                </div>
            </Container>
        </div>


    );

}

export default Recharger;