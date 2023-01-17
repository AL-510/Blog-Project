import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  styled
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";

const StyleTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;



const Categories = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
  return (
    <>
    <StyledLink to={`/create?category=${category || ''}`} >
        <Button variant="contained" style={{margin: 20, width: '85%', background: '#6495ED', color: '#FFF'}}>Create Blog</Button>
    </StyledLink>
      <StyleTable>
        <TableHead>
          <TableRow>
            <TableCell>
                <StyledLink to='/'>
                   All Categories
                </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>{category.type}</StyledLink>       
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyleTable>
    </>
  );
};

export default Categories;
