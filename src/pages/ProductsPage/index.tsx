import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../routers/apis/Products';
import { IProduct, IRole } from '../../utils/type';
import {
  Button,
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  IndexTable,
  Layout,
  LegacyCard,
  Page,
  TabProps,
  Text,
  Thumbnail,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode,
  Pagination,
  Tag,
} from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { statusProduct } from '../../utils/constant';
import { AddRoleDialog } from '../../components/AddRoleDialog';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [queryValue, setQueryValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusPro, setStatusPro] = useState<string[] | undefined>(undefined);
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(false);
  const [infoProduct, setInfoProduct] = useState<IRole[]>([]);

  const itemsPerPage = 10;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const currentProductsClone = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const tabs: TabProps[] = ['All', 'Active', 'No rule'].map((item, index) => ({
    content: item,
    index,
    onAction: () => {
      if (index === 0) {
        if (!queryValue) {
          setProducts(currentProductsClone);
        } else {
          let filteredProducts = allProducts.filter((product) =>
            product.title.toLowerCase().includes(queryValue.toLowerCase())
          );
          setProducts(filteredProducts);
        }
      } else {
        const filteredProducts = allProducts.filter((product: any) => {
          if (index === 1) {
            return product.status === index;
          }
          return product.status === index - 2;
        });
        setProducts(
          filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(queryValue.toLowerCase())
          )
        );
      }
    },
    id: `${item}-${index}`,
    actions: [],
  }));

  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    if (queryValue) {
      let filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(queryValue.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
    return true;
  };

  const primaryAction: IndexFiltersProps['primaryAction'] = {
    type: 'save',
    onAction: onHandleSave,
    disabled: false,
    loading: false,
  };

  const handleAccountStatusChange = useCallback(
    (value: string[]) => setStatusPro(value),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value: any) => setQueryValue(value),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setStatusPro(undefined),
    []
  );

  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleQueryValueRemove();
  }, [handleAccountStatusRemove, handleQueryValueRemove]);

  const filters = [
    {
      key: 'Status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={(statusProduct || [])?.map((v) => ({ label: v, value: v }))}
          selected={statusPro || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rowMarkup = currentProducts?.map(
    ({ id, image, lastUpdate, rules, status, title }, index) => (
      <IndexTable.Row
        id={id.toString()}
        key={id}
        selected={selectedResources.includes(id.toString())}
        position={index}
      >
        <IndexTable.Cell>
          <div className="item-center gap-4">
            <Thumbnail source={image} size="large" alt={title} />
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {title}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>{rules?.length}</IndexTable.Cell>
        <IndexTable.Cell>{lastUpdate}</IndexTable.Cell>
        <IndexTable.Cell>
          <Tag>
            <Text as="span" alignment="end" numeric>
              {statusProduct[status]}
            </Text>
          </Tag>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="justify-center">
            <Button
              icon={PlusIcon}
              onClick={() => {
                setActive(true);
                setInfoProduct(rules);
              }}
            >
              Add Role
            </Button>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  useEffect(() => {
    getProducts().then((res: any[]) => {
      setProducts(res);
      setAllProducts(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filteredProducts = allProducts;

    if (statusPro && statusPro.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        statusPro.includes(statusProduct[product.status])
      );
    }

    setProducts(filteredProducts);
  }, [statusPro, allProducts]);

  return (
    <Page
      fullWidth
      title="Products"
      secondaryActions={<Button>Add Product</Button>}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <IndexFilters
              queryValue={queryValue || ''}
              queryPlaceholder="Searching in all"
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={() => setQueryValue('')}
              primaryAction={primaryAction}
              cancelAction={{
                onAction: onHandleCancel,
                disabled: false,
                loading: false,
              }}
              tabs={tabs}
              selected={selected}
              onSelect={setSelected}
              filters={filters}
              onClearAll={handleFiltersClearAll}
              mode={mode}
              setMode={setMode}
            />
            <IndexTable
              condensed={useBreakpoints().smDown}
              resourceName={resourceName}
              itemCount={products.length}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: 'Product' },
                { title: 'Rule(s)' },
                { title: 'Last Update' },
                { title: 'Status' },
                { title: '' },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>

          <div className="justify-end my-4">
            <Pagination
              onPrevious={() => setCurrentPage(currentPage - 1)}
              onNext={() => setCurrentPage(currentPage + 1)}
              type="table"
              hasPrevious={currentPage > 1}
              hasNext={currentPage < Math.ceil(products.length / itemsPerPage)}
              label={`${indexOfFirstProduct + 1}-${Math.min(
                indexOfLastProduct,
                products.length
              )} of ${products.length} products`}
            />
          </div>
          <AddRoleDialog
            active={active}
            setActive={setActive}
            infoProduct={infoProduct}
            setInfoProduct={setInfoProduct}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ProductsPage;
