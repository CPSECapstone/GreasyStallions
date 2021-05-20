import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Alert, ListGroup, Button, Col, Row, Card, Accordion} from 'react-bootstrap';
import { useQuery, gql} from '@apollo/client';
import { Typography, Paper, Grid } from '@material-ui/core';
import MissionTaskProgress from './MissionTaskProgress'

let MissionPage = function({ route, navigation}){

    const { id } = route.params


    return (
        <View>
            <MissionTaskProgress id={id}/>
        </View>
    );
}

export default MissionPage;