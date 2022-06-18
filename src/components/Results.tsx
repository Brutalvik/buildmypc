import { Button, List, Skeleton } from 'antd';
import { useAppSelector } from '../app/hooks';
import { ResultsInterface } from '../models/model';

const Results: React.FC<ResultsInterface> = ({
  filtereddata,
  renderdata,
  addtocart,
}) => {
  const state = useAppSelector((state) => state);
  const { loading } = state.genericReducer;

  const render = (item: any) => {
    switch (item.type) {
      case 'cpu':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.socket}`}
            description={`Clock Speed: ${item.clock}  ||  Total Cores: ${item.cores} || L3 Cache: ${item.l3} `}
          />
        );
      case 'memory':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.for}`}
            description={`Version ${item.version}  || capacity: ${item.cores}`}
          />
        );
      case 'motherboard':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}`}
            description={`Chipset ${item.chipset}  || Socket: ${item.socket} || Form-Factor: ${item.formfactor}`}
          />
        );
      case 'gpu':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.chipset}`}
            description={`Memory ${item.memory}  || Clock: ${item.memoryclock} || Shaders: ${item.shaders} || BUS: ${item.bus}`}
          />
        );
      default:
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.chipset}`}
          />
        );
    }
  };

  return (
    <>
      <List
        loading={loading}
        itemLayout='horizontal'
        size='large'
        dataSource={filtereddata.length > 0 ? filtereddata : renderdata}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={item.id}
                onClick={() => addtocart?.(item)}
                type='primary'
              >
                Add to Cart
              </Button>,
            ]}
          >
            <Skeleton loading={loading} active>
              <>
                {render(item)}
                <div>
                  <h4>$ {item.price}</h4>
                </div>
              </>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Results;
