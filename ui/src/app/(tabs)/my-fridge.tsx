import { t } from "@lingui/core/macro";
import {
  FridgeItem,
  ItemsResponse,
  useVirtualFridgeAddItemMutation,
  useVirtualFrigeGetItemsQuery,
} from "@/api/virtual_fridge";
import Loader from "@/components/ui/Loader";
import Text from "@/components/ui/Text";
import PageContainer from "@/components/PageContainer";
import InputQuantity from "@/components/InputQuantity";
import Modal from "@/components/ui/Modal";
import Stack from "@/components/ui/Stack";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import ControlTextInput from "@/components/ui/ControlTextInput";
import TextError from "@/components/ui/TextError";
import Card from "@/components/ui/Card";
import HSeparator from "@/components/ui/HSeparator";

type MyFridgeAddItemModalProps = {
  open: boolean;
  close: () => void;
};

type MyFridgeAddItemModalForm = {
  item_name: string;
  quantity: {
    value: number;
    unit: string;
  };
};

function MyFridgeAddItemModal({ open, close }: MyFridgeAddItemModalProps) {
  const [addItem, result] = useVirtualFridgeAddItemMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { item_name: "", quantity: { value: 0, unit: "gr" } },
  });

  function onSubmit(data: MyFridgeAddItemModalForm) {
    addItem({
      item_name: data.item_name,
      quantity: data.quantity.value,
      unit: data.quantity.unit,
    })
      .unwrap()
      .then(() => close());
  }

  return (
    <Modal title={t`Add item`} open={open} close={close}>
      <Stack gap="md">
        <ControlTextInput
          label={t`Item:`}
          name="item_name"
          control={control}
          errors={errors}
        />
        {/*<ControlTextInput
          label={t`Quantity:`}
          name="quantity"
          control={control}
          errors={errors}
        />*/}
        <InputQuantity name="quantity" control={control} />
        <TextError error={result.error} />
        <Stack direction="horizontal" style={{ justifyContent: "flex-end" }}>
          <Button
            loading={result.isLoading}
            onPress={() => handleSubmit(onSubmit)()}
            color="primary"
            title={t`Add`}
            disabled={result.isLoading}
          />
        </Stack>
      </Stack>
    </Modal>
  );
}

type MyFridgeItemsRowProps = {
  item: FridgeItem;
};

function MyFridgeItemsRow({ item }: MyFridgeItemsRowProps) {
  return (
    <Stack direction="horizontal">
      <Text>{item.item_name}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.unit}</Text>
    </Stack>
  );
}

function MyFridgeItems({ items }: ItemsResponse) {
  return (
    <Card>
      <Stack gap="md">
        {items.map((item, index) => (
          <Fragment key={item.id.toString()}>
            <MyFridgeItemsRow item={item} />
            {index === items.length - 1 ? null : <HSeparator />}
          </Fragment>
        ))}
      </Stack>
    </Card>
  );
}

export default function MyFridge() {
  const virtualFridgeGetItemsQuery = useVirtualFrigeGetItemsQuery();
  const [addItemModalIsOpen, setAddItemModalIsOpen] = useState(true);

  return (
    <PageContainer
      title={t`My fridge`}
      onNewPressed={() => setAddItemModalIsOpen(true)}
    >
      <MyFridgeAddItemModal
        open={addItemModalIsOpen}
        close={() => setAddItemModalIsOpen(false)}
      />
      <Loader query={virtualFridgeGetItemsQuery} render={MyFridgeItems} />
    </PageContainer>
  );
}
