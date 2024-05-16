const express = require('express');
const route= express.Router();
const path = require('path');

route.get('^/&|index(.html?)', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
  });

module.exports= route;