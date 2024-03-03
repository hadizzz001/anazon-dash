import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BasicCardProps {
  word: string;
  definition: string;
  partOfSpeech: string;
  example?: string;
  _id:string;
  Delete?: any;
  usageCount:number;
  minimumOrderAmount:any;
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px',width:{xs:'48%',sm:'fit-content'} }}
  >
    •
  </Box>
);

const BasicCard: React.FC<BasicCardProps> = ({
  word,
  definition,
  partOfSpeech,
  example,
  usageCount,
  Delete,
  minimumOrderAmount,
  _id
}) => {
  return (
    <Card sx={{ minWidth:{xs:'150px',sm:'160px'}, width: 'fit-content',my:1 }}>
      <CardContent>

        <Typography variant="h5" component="div">
          {word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Limit: {partOfSpeech}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        minimumOrderAmount: {minimumOrderAmount}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Usage: {usageCount} times
        </Typography>
        <Typography variant="body2">
          {definition}
          <br />
          {example && ` Expires at: "${example}"`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        onClick={()=>Delete(_id)}
        sx={{color:'red'}} size="small">Delete Coupon</Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
